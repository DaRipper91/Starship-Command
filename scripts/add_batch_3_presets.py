import sqlite3
import os
from datetime import datetime

DB_PATH = "/home/daripper/Projects/Starship-Command/instance/starship_themes.db"
PRESETS_DIR = "/tmp/presets_batch_3"

METADATA = {
    "11-toxic-wasteland.toml": {
        "name": "Toxic Wasteland",
        "description": "Radioactive hazard zone \u2014 sickly yellow-green and rust, biohazard/radiation glyphs.",
        "category": "Hazard"
    },
    "12-tarot-oracle.toml": {
        "name": "Tarot Oracle",
        "description": "Mystic divination \u2014 midnight indigo, gold foil, blood crimson. Sun/moon/eye glyphs.",
        "category": "Mystical"
    },
    "13-ghost-mariner.toml": {
        "name": "Ghost Mariner",
        "description": "A shipwreck that never quite sank \u2014 fog gray, sea green, bone white, anchor and skull glyphs.",
        "category": "Nautical"
    },
    "14-matrix-cipher.toml": {
        "name": "Matrix Cipher",
        "description": "Classic green-on-black hacker terminal. Clean code-rain aesthetic.",
        "category": "Cyberpunk"
    },
    "15-ink-and-steel.toml": {
        "name": "Ink and Steel",
        "description": "Sumi-e ink wash / feudal Japan. Uses real kanji for symbols.",
        "category": "Minimal"
    }
}

def inject():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    for filename, meta in METADATA.items():
        filepath = os.path.join(PRESETS_DIR, filename)
        if not os.path.exists(filepath):
            print(f"Skipping {filename}, file not found.")
            continue
            
        with open(filepath, "r", encoding="utf-8") as f:
            toml_content = f.read().strip()
            
        c.execute("INSERT OR REPLACE INTO themes (name, description, author, category, config_toml, stars, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (meta["name"], 
                   meta["description"], 
                   "DaRipper91", 
                   meta["category"], 
                   toml_content, 
                   55, 
                   datetime.now()))
        print(f"Injected: {meta['name']}")
        
    conn.commit()
    conn.close()
    print("Batch 3 Presets Injected Successfully.")

if __name__ == "__main__":
    inject()
