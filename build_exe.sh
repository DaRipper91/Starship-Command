#!/bin/bash
set -e

echo "Building React Frontend..."
npm install
npx vite build

echo "Setting up Python environment..."
cd server
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
./venv/bin/pip install --upgrade pip
./venv/bin/pip install -r requirements.txt
./venv/bin/pip install pyinstaller SQLAlchemy Flask-SQLAlchemy

echo "Running PyInstaller..."
# Remove old builds
rm -rf build dist StarshipCommand.spec

# Package the application
# --add-data "source:destination" (on Linux/Mac it's :, on Windows it's ;)
./venv/bin/pyinstaller --name StarshipCommand \
    --onefile \
    --add-data "../dist:dist" \
    --hidden-import "flask_sqlalchemy" \
    --hidden-import "sqlalchemy" \
    --hidden-import "sqlalchemy.orm" \
    --hidden-import "werkzeug.security" \
    server.py

echo "Build complete. Executable is located at server/dist/StarshipCommand"
