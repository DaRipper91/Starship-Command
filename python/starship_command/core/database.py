import sqlite3
import os
from typing import List, Dict, Any

class DatabaseManager:
    """
    Handles internal store interactions with starship_themes.db
    """
    def __init__(self, db_path: str = None):
        if db_path is None:
            # Absolute path for the unified engine
            db_path = "/home/daripper/Projects/Starship-Command/instance/starship_themes.db"
        self.db_path = db_path

    def get_all_themes(self) -> List[Dict[str, Any]]:
        if not os.path.exists(self.db_path):
            return []
            
        themes = []
        try:
            conn = sqlite3.connect(self.db_path)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, description, author, category, config_toml, stars FROM themes ORDER BY stars DESC")
            
            for row in cursor.fetchall():
                themes.append(dict(row))
            conn.close()
        except Exception as e:
            print(f"Database Error: {e}")
            
        return themes

    def get_theme_by_id(self, theme_id: int) -> Dict[str, Any]:
        try:
            conn = sqlite3.connect(self.db_path)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM themes WHERE id = ?", (theme_id,))
            row = cursor.fetchone()
            conn.close()
            return dict(row) if row else None
        except Exception:
            return None

    def insert_theme(self, name: str, description: str, author: str, category: str, config_toml: str, stars: int = 5) -> bool:
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO themes (name, description, author, category, config_toml, created_at, stars) VALUES (?, ?, ?, ?, ?, datetime('now'), ?)",
                (name, description, author, category, config_toml, stars)
            )
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"Database Save Error: {e}")
            return False
