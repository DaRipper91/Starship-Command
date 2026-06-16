#!/bin/bash
PROJECT_ROOT="/home/daripper/Projects/Starship-Command"
export PYTHONPATH="$PROJECT_ROOT/python:$PYTHONPATH"

# Try to detect display server
if [ -n "$WAYLAND_DISPLAY" ]; then
    export QT_QPA_PLATFORM=wayland
elif [ -n "$DISPLAY" ]; then
    export QT_QPA_PLATFORM=xcb
fi

cd "$PROJECT_ROOT"
python3 "$PROJECT_ROOT/python/starship_command/main.py"
