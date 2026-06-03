import os
import subprocess
from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

from models import db, Theme, User

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_STRICT_MODE'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///starship_themes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = ['Minimalist', 'Informative', 'Colorful', 'Nerd Fonts', 'Powerline', 'Retro']
    return jsonify(categories)

@app.route('/api/themes', methods=['GET'])
def get_themes():
    category = request.args.get('category')
    query = Theme.query
    if category:
        query = query.filter(Theme.category == category)
    themes = query.order_by(Theme.stars.desc(), Theme.created_at.desc()).all()
    return jsonify([theme.to_dict() for theme in themes])

@app.route('/api/themes', methods=['POST'])
def create_theme():
    data = request.get_json()

    if not data or 'name' not in data or 'config_toml' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    # Map author_id or author to the author field
    author = data.get('author')
    if not author and data.get('author_id') is not None:
        user = User.query.get(data.get('author_id'))
        if user:
            author = user.username
    if not author:
        author = f"User {data.get('author_id', 'Anonymous')}"

    new_theme = Theme(
        name=data['name'],
        description=data.get('description', ''),
        author=author,
        category=data.get('category', 'Uncategorized'),
        config_toml=data['config_toml'],
        preview_image=data.get('preview_image')
    )

    db.session.add(new_theme)
    db.session.commit()

    return jsonify(new_theme.to_dict()), 201

@app.route('/api/themes/<int:theme_id>/star', methods=['POST'])
def star_theme(theme_id):
    theme = Theme.query.get_or_404(theme_id)
    theme.stars += 1
    db.session.commit()
    return jsonify(theme.to_dict())


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400

    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username is already taken'}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email is already registered'}), 409

    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({'user_id': user.id, 'username': user.username}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid username or password'}), 401

    return jsonify({'user_id': user.id, 'username': user.username}), 200


@app.route('/api/save-local', methods=['POST'])
def save_local():
    data = request.get_json() or {}
    config_toml = data.get('config_toml')
    if not config_toml or not isinstance(config_toml, str):
        return jsonify({'error': 'config_toml is required'}), 400

    config_dir = Path.home() / '.config'
    config_dir.mkdir(parents=True, exist_ok=True)
    output_path = config_dir / 'starship.toml'
    output_path.write_text(config_toml, encoding='utf-8')

    return jsonify({'ok': True, 'path': str(output_path)}), 200


@app.route('/api/ssh-sync', methods=['POST'])
def ssh_sync():
    data = request.get_json() or {}
    host = (data.get('host') or '').strip()
    user = (data.get('user') or '').strip()
    password = data.get('password') or ''
    config_toml = data.get('config_toml')

    if not host or not user or not config_toml:
        return jsonify({'error': 'host, user, and config_toml are required'}), 400

    remote_cmd = 'mkdir -p ~/.config && cat > ~/.config/starship.toml'
    base_cmd = [
        'ssh',
        '-o',
        'StrictHostKeyChecking=accept-new',
        f'{user}@{host}',
        remote_cmd,
    ]

    cmd = base_cmd
    if password:
        sshpass_path = subprocess.run(
            ['which', 'sshpass'],
            capture_output=True,
            text=True,
        ).stdout.strip()
        if not sshpass_path:
            return jsonify({
                'error': 'sshpass is required for password-based sync. Install sshpass or use SSH keys.',
            }), 501
        cmd = [sshpass_path, '-p', password, *base_cmd]

    try:
        result = subprocess.run(
            cmd,
            input=config_toml,
            text=True,
            capture_output=True,
            timeout=20,
            check=True,
        )
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'SSH sync timed out'}), 504
    except subprocess.CalledProcessError as exc:
        stderr = (exc.stderr or '').strip()
        return jsonify({'error': f'SSH sync failed: {stderr or "unknown error"}'}), 502

    return jsonify({'ok': True, 'stdout': (result.stdout or '').strip()}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
