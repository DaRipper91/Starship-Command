import sqlite3
import os
from datetime import datetime

DB_PATH = "/home/daripper/Projects/Starship-Command/instance/starship_themes.db"

TOML_CONTENT = r'''
"$schema" = 'https://starship.rs/config-schema.json'

add_newline = true

format = """
[ ](fg:#3d1f4e)$directory$git_branch$git_status
$character"""

right_format = """$cmd_duration$time"""

[directory]
style = "fg:#a87fd1 bold"
format = "[$path]($style)"
truncation_length = 3
truncate_to_repo = true
home_symbol = "\U0001F56F"
truncation_symbol = "\u2026\u263D"

[directory.substitutions]
"/" = " \u263D "

[git_branch]
style = "fg:#6b8e4e bold"
format = "[ \U0001F987 $branch]($style)"

[git_status]
style = "fg:#8b2942"
format = '[ $all_status$ahead_behind]($style)'
ahead = "\u219F${count}"
behind = "\u21A1${count}"
diverged = "\u26A1"
untracked = "\U0001F319${count}"
modified = "\U0001F577${count}"
staged = "\u2726${count}"
deleted = "\U0001F480${count}"
stashed = "\U0001F52E${count}"
conflicted = "\u26E7"

[character]
success_symbol = "[\u26E4](fg:#6b8e4e bold)"
error_symbol = "[\u26E7](fg:#8b2942 bold)"
vimcmd_symbol = "[\U0001F52E](fg:#a87fd1)"

[cmd_duration]
style = "fg:#5a3d6e"
format = "[ \U0001F56F $duration]($style)"
min_time = 4000
show_milliseconds = false

[time]
disabled = false
style = "fg:#3d1f4e"
format = "[ \U0001F319 $time]($style)"
time_format = "%H:%M"
'''

def inject():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO themes (name, description, author, category, config_toml, stars, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
              ("Hex and Hallow", 
               "An occult-themed prompt with witchy aesthetics, dark purples, and mystical symbols.", 
               "Copilot", 
               "Mystical", 
               TOML_CONTENT.strip(), 
               50, 
               datetime.now()))
    conn.commit()
    conn.close()
    print("Theme 'Hex and Hallow' Injected Successfully.")

if __name__ == "__main__":
    inject()
