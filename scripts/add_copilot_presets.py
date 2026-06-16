import sqlite3
import os
from datetime import datetime

# Absolute path for reliability
DB_PATH = "/home/daripper/Projects/Starship-Command/instance/starship_themes.db"

COPILOT_PRESETS = [
    {
        "name": "Neon Vector",
        "category": "Cyberpunk",
        "toml": 'format = """\n[\uE0B6](#ff00aa)\\\n$directory\\\n[\uE0B0](#ff00aa)\\\n$git_branch$git_status\n$character\n"""\n\n[directory]\nstyle = "bg:#ff00aa fg:#ffffff"\ntruncation_length = 3\n\n[git_branch]\nsymbol = "\uF418 "\nstyle = "bg:#ff00aa fg:#00eaff"\n\n[character]\nsuccess_symbol = "[❯](bold #00eaff)"'
    },
    {
        "name": "Brutalist Blocks",
        "category": "Brutalist",
        "toml": 'format = """\n[\uE0B6](#303030)\\\n$directory\\\n[\uE0B0](#303030)\\\n$git_branch\\\n[\uE0B0](#303030)\\\n$git_status\\\n[\uE0B0 ](#303030)\n$character\n"""\n\n[directory]\nstyle = "bg:#303030 fg:#ffffff"\n\n[git_branch]\nsymbol = "\uE0A0 "\nstyle = "bg:#303030 fg:#00ff88"'
    },
    {
        "name": "Stealth Mono",
        "category": "Minimal",
        "toml": 'format = "$directory$git_branch$git_status\n$character"\n\n[directory]\nstyle = "fg:#bbbbbb"\n\n[git_branch]\nsymbol = "\uF418 "\nstyle = "fg:#888888"'
    }
]

def inject():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    for p in COPILOT_PRESETS:
        c.execute("INSERT OR REPLACE INTO themes (name, description, author, category, config_toml, stars, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (p["name"], "Copilot Preset // High-Energy", "Copilot", p["category"], p["toml"], 30, datetime.now()))
    conn.commit()
    conn.close()
    print("Sovereign Presets (Copilot Set 1) Injected Successfully.")

if __name__ == "__main__":
    inject()
