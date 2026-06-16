import sqlite3
import os
import sys
from datetime import datetime

# Add python path
sys.path.append(os.path.join(os.getcwd(), "python"))

from starship_command.core.parser import TomlParser
from starship_command.core.models import StarshipConfig, ThemeMetadata

DB_PATH = os.path.join(os.getcwd(), "instance/starship_themes.db")

AGENT_THEMES = [
    {
        "agent": "Bolt ⚡",
        "name": "Hyper-Refresh",
        "desc": "Optimized for 120Hz+ screens. Ultra-minimal O(1) rendering path.",
        "category": "Performance",
        "primary": "#fabd2f", # Yellow
        "modules": ["directory", "cmd_duration"]
    },
    {
        "agent": "Palette 🎨",
        "name": "Pastel Sovereign",
        "desc": "A soothing, accessible theme with perfect WCAG contrast ratios.",
        "category": "UX/UI",
        "primary": "#cba6f7", # Mauve
        "modules": ["os", "directory", "git_branch", "python"]
    },
    {
        "agent": "Sentinel 🛡️",
        "name": "Hardened Shell",
        "desc": "Minimal surface area. Red indicators for non-zero exit codes.",
        "category": "Security",
        "primary": "#f38ba8", # Red
        "modules": ["username", "hostname", "status", "character"]
    },
    {
        "agent": "Chaos 🌀",
        "name": "Glitch Protocol",
        "desc": "Everything is broken but it looks intentional. Weird symbols only.",
        "category": "Experimental",
        "primary": "#94e2d5", # Teal
        "modules": ["custom", "memory_usage", "shlvl", "character"]
    },
    {
        "agent": "Architect 🏗️",
        "name": "Structural Integrity",
        "desc": "A logical, multi-line layout showing full repository depth.",
        "category": "Architecture",
        "primary": "#89b4fa", # Blue
        "modules": ["directory", "git_branch", "git_status", "docker_context"]
    },
    {
        "agent": "Auditor 🕵️",
        "name": "Strictly Valid",
        "desc": "No slop allowed. Every module has a dedicated Powerline box.",
        "category": "Quality",
        "primary": "#a6e3a1", # Green
        "modules": ["os", "directory", "package", "rust", "nodejs"]
    },
    {
        "agent": "Writer ✍️",
        "name": "The Chronicler",
        "desc": "Verbose descriptions of your current environment. Documentation-first.",
        "category": "Content",
        "primary": "#f9e2af", # Peach
        "modules": ["time", "username", "directory", "env_var"]
    },
    {
        "agent": "Fast ⚡",
        "name": "Phi-Minimal",
        "desc": "The fastest prompt in the west. Literally just a character.",
        "category": "Utility",
        "primary": "#cdd6f4", # Text
        "modules": ["character"]
    }
]

def post_theme(theme_data):
    # Generate Config
    config = TomlParser.get_default_config()
    config.format = "".join([f"${m}" for m in theme_data["modules"]]) + "$line_break$character"
    
    # Generate TOML
    toml_str = TomlParser.stringify(config)
    
    # Insert into DB
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO themes (name, description, author, category, config_toml, stars, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        theme_data["name"],
        theme_data["desc"],
        theme_data["agent"],
        theme_data["category"],
        toml_str,
        0,
        datetime.utcnow()
    ))
    
    conn.commit()
    conn.close()
    print(f"Successfully posted theme: {theme_data['name']} by {theme_data['agent']}")

if __name__ == "__main__":
    if not os.path.exists(DB_PATH):
        print(f"Error: DB not found at {DB_PATH}")
        sys.exit(1)
        
    for theme in AGENT_THEMES:
        post_theme(theme)
