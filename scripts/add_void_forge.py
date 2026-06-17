import sqlite3
import os
from datetime import datetime

DB_PATH = "/home/daripper/Projects/Starship-Command/instance/starship_themes.db"

TOML_CONTENT = r'''
"$schema" = 'https://starship.rs/config-schema.json'

add_newline = true

format = """
[\u25B7](fg:#ff5500)$directory$git_branch$git_status
$character"""

right_format = """$cmd_duration"""

[directory]
style = "fg:#d4a373 bold"
format = "[ $path]($style)"
truncation_length = 3
truncate_to_repo = true
home_symbol = "\u2302"
truncation_symbol = "\u2039\u2026\u203A"

[directory.substitutions]
"/" = " \u2039 "

[git_branch]
style = "fg:#8a5a3c"
format = "[ \u2692 $branch]($style)"

[git_status]
style = "fg:#ff5500"
format = '[ $all_status$ahead_behind]($style)'
ahead = "\u25B3${count}"
behind = "\u25BD${count}"
diverged = "\u25C7"
untracked = "\u00B7${count}"
modified = "\u2260${count}"
staged = "\u25B2${count}"
deleted = "\u2715${count}"
stashed = "\u25A3${count}"
conflicted = "\u2694"

[character]
success_symbol = "[\u25C6](fg:#ff5500 bold)"
error_symbol = "[\u25C7](fg:#5c1f0f bold)"
vimcmd_symbol = "[\u25C8](fg:#d4a373)"

[cmd_duration]
style = "fg:#5c1f0f"
format = "[ \u23DA $duration]($style)"
min_time = 4000
show_milliseconds = false
'''

def inject():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO themes (name, description, author, category, config_toml, stars, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
              ("Void_Forge", 
               "An industrial-forge themed prompt with warm oranges, forge browns, and sharp geometric indicators.", 
               "Copilot", 
               "Industrial", 
               TOML_CONTENT.strip(), 
               40, 
               datetime.now()))
    conn.commit()
    conn.close()
    print("Theme 'Void_Forge' Injected Successfully.")

if __name__ == "__main__":
    inject()
