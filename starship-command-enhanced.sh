#!/bin/bash
# Launcher for Starship Command Enhanced
export FLASK_APP=/usr/share/starship-command-enhanced/server/server.py
python /usr/share/starship-command-enhanced/server/server.py "$@"
