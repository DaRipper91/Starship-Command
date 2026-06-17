import sqlite3
import os
from datetime import datetime

DB_PATH = "/home/daripper/Projects/Starship-Command/instance/starship_themes.db"

TOML_CONTENT = r'''
"$schema" = 'https://starship.rs/config-schema.json'

add_newline = true

format = """
[ ](fg:#5c5470)$directory$git_branch$git_status
$character"""

right_format = """$cmd_duration"""

[directory]
style = "fg:#a09abc"
format = "[$path]($style)"
truncation_length = 3
truncate_to_repo = true
home_symbol = "~"
truncation_symbol = "\u2026\u00B7" # …·

[directory.substitutions]
"/" = " \u00B7 " # ·

[git_branch]
style = "fg:#5c5470"
format = "[  $branch]($style)"
symbol = ""

[git_status]
style = "fg:#7a6f9b"
format = '[ $all_status$ahead_behind]($style)'
ahead = "\uA70F${count}" # ꜏
behind = "\uA70E${count}" # ꜎
diverged = "\uA70F\uA70E" # ꜏꜎
untracked = "\u2218" # ∘
modified = "\u2240" # ≀ (using approx/sine for 'ward' vibe)
staged = "\u2726" # ✦
deleted = "\u2715" # ✕
stashed = "\u25AA" # ▪
conflicted = "\u2694" # ⚔

[character]
success_symbol = "[\u16DD](fg:#a09abc bold)" # ᛝ (Ingwaz Rune)
error_symbol = "[\u16DD](fg:#4a3f5c bold)"
vimcmd_symbol = "[\u16DF](fg:#7a6f9b)" # ᛟ (Othala Rune)

[cmd_duration]
style = "fg:#4a3f5c"
format = "[$duration]($style)"
min_time = 4000
show_milliseconds = false
'''

def inject():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO themes (name, description, author, category, config_toml, stars, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
              ("Obsidian Ward", 
               "A brutalist, runic theme with muted purples and slate tones. Focuses on ancient protection symbols and surgical minimalism.", 
               "Copilot", 
               "Brutalist", 
               TOML_CONTENT.strip(), 
               45, 
               datetime.now()))
    conn.commit()
    conn.close()
    print("Theme 'Obsidian Ward' Injected Successfully.")

if __name__ == "__main__":
    inject()
