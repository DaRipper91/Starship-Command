from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
        }


class Theme(db.Model):
    __tablename__ = 'themes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    author = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=True)
    config_toml = db.Column(db.Text, nullable=False)  # The Starship TOML config
    preview_image = db.Column(db.Text, nullable=True) # Base64 image
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    stars = db.Column(db.Integer, default=0)

    def to_dict(self):
        created_iso = self.created_at.isoformat()
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'author': self.author,
            # Backward-compatible key expected by some UI paths.
            'author_username': self.author,
            'category': self.category,
            'config_toml': self.config_toml,
            'preview_image': self.preview_image,
            'created_at': created_iso,
            # Updated timestamp is not yet tracked separately server-side.
            'updated_at': created_iso,
            'stars': self.stars,
            # Backward-compatible alias expected by older UI.
            'downloads': self.stars,
        }
