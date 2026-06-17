from PySide6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QScrollArea, QFrame, QLineEdit,
    QListWidget, QListWidgetItem, QAbstractItemView,
    QTabWidget, QFileDialog, QDialog, QFormLayout,
    QColorDialog, QSpinBox, QGridLayout, QCheckBox,
    QComboBox, QTextEdit, QGroupBox
)
from PySide6.QtCore import Qt, Signal, QSize, QTimer, QThread
from starship_command.core.database import DatabaseManager
import os
import glob
import hashlib
import json
from fontTools.ttLib import TTFont
from PySide6.QtGui import QFont

GLOBAL_SYMBOL_CACHE = set()
GLOBAL_SCANNER_STATUS = "idle"  # "idle", "scanning", "done"
GLOBAL_SCANNER_PROGRESS = 0
GLOBAL_SCANNER_THREAD = None

SYMBOL_RANGES = [
    (0x2200, 0x22FF),      # Mathematical Operators
    (0x2300, 0x23FF),      # Miscellaneous Technical
    (0x2500, 0x257F),      # Box Drawing
    (0x2580, 0x259F),      # Block Elements
    (0x25A0, 0x25FF),      # Geometric Shapes
    (0x2600, 0x26FF),      # Miscellaneous Symbols
    (0x2700, 0x27BF),      # Dingbats
    (0x27F0, 0x27FF),      # Supplemental Arrows-A
    (0x2900, 0x297F),      # Supplemental Arrows-B
    (0x2B00, 0x2BFF),      # Miscellaneous Symbols and Arrows
    (0xE000, 0xF8FF),      # Private Use Area (Nerd Fonts / Font Awesome)
    (0xF0000, 0xFFFFD),    # Supplementary Private Use Area-A
    (0x100000, 0x10FFFD),  # Supplementary Private Use Area-B
    (0x1F300, 0x1F9FF),    # Emojis & Pictographs
]

class SymbolScannerThread(QThread):
    progress = Signal(int)
    finished = Signal(set)

    def __init__(self, font_paths, ranges):
        super().__init__()
        self.font_paths = font_paths
        self.ranges = ranges

    def run(self):
        global GLOBAL_SCANNER_STATUS, GLOBAL_SCANNER_PROGRESS
        GLOBAL_SCANNER_STATUS = "scanning"
        unique_symbols = set()
        total = len(self.font_paths)
        
        # Load from cache first if valid
        cache_dir = os.path.expanduser("~/.cache/starship-command")
        cache_file = os.path.join(cache_dir, "symbols_cache.json")
        fingerprint = self.get_fonts_fingerprint(self.font_paths)
        
        if os.path.exists(cache_file):
            try:
                with open(cache_file, "r") as f:
                    data = json.load(f)
                if data.get("fingerprint") == fingerprint:
                    symbols = data.get("symbols", [])
                    unique_symbols = set(symbols)
                    GLOBAL_SYMBOL_CACHE.update(unique_symbols)
                    GLOBAL_SCANNER_STATUS = "done"
                    GLOBAL_SCANNER_PROGRESS = 100
                    self.finished.emit(unique_symbols)
                    return
            except Exception:
                pass

        # Scan if cache missing or invalid
        for i, path in enumerate(self.font_paths):
            if self.isInterruptionRequested():
                break
            try:
                font = TTFont(path, fontNumber=0, lazy=True)
                cmap = font['cmap']
                for table in cmap.tables:
                    for char_code in table.cmap.keys():
                        if any(start <= char_code <= end for start, end in self.ranges):
                            unique_symbols.add(chr(char_code))
            except Exception:
                pass
            GLOBAL_SCANNER_PROGRESS = int((i + 1) / total * 100)
            self.progress.emit(GLOBAL_SCANNER_PROGRESS)

        # Filter printable non-space
        clean_symbols = {c for c in unique_symbols if c.isprintable() and not c.isspace()}
        GLOBAL_SYMBOL_CACHE.update(clean_symbols)
        GLOBAL_SCANNER_STATUS = "done"
        
        # Save to cache
        try:
            os.makedirs(cache_dir, exist_ok=True)
            with open(cache_file, "w") as f:
                json.dump({"fingerprint": fingerprint, "symbols": list(clean_symbols)}, f)
        except Exception:
            pass

        self.finished.emit(clean_symbols)

    def get_fonts_fingerprint(self, font_paths):
        hasher = hashlib.md5()
        for p in font_paths:
            try:
                mtime = os.path.getmtime(p)
                size = os.path.getsize(p)
                hasher.update(f"{p}:{mtime}:{size}".encode("utf-8"))
            except Exception:
                pass
        return hasher.hexdigest()

def start_global_symbol_scan():
    global GLOBAL_SCANNER_THREAD
    if GLOBAL_SCANNER_THREAD is not None:
        return
        
    dirs = [
        "/usr/share/fonts/**/*.ttf",
        "/usr/share/fonts/**/*.otf",
        os.path.expanduser("~/.local/share/fonts/**/*.ttf"),
        os.path.expanduser("~/.local/share/fonts/**/*.otf"),
        os.path.expanduser("~/.fonts/**/*.ttf"),
        os.path.expanduser("~/.fonts/**/*.otf")
    ]
    font_files = []
    for d in dirs:
        font_files.extend(glob.glob(d, recursive=True))
    font_files = sorted(list(set(font_files)))
    
    GLOBAL_SCANNER_THREAD = SymbolScannerThread(font_files, SYMBOL_RANGES)
    GLOBAL_SCANNER_THREAD.start()

class SaveToStoreDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Save Theme to Sovereign Store")
        self.setMinimumWidth(450)
        self.setStyleSheet("""
            QDialog { background-color: #1e1e2e; color: #cdd6f4; font-size: 14px; }
            QLineEdit, QComboBox, QTextEdit { background-color: #11111b; border: 1px solid #45475a; padding: 8px; border-radius: 4px; color: #cdd6f4; }
            QLabel { font-weight: bold; color: #a6adc8; }
            QPushButton { background-color: #313244; color: #cdd6f4; border: 1px solid #45475a; font-weight: bold; border-radius: 4px; padding: 10px; }
            QPushButton:hover { background-color: #45475a; }
        """)
        
        layout = QVBoxLayout(self)
        layout.setContentsMargins(20, 20, 20, 20)
        layout.setSpacing(15)
        
        title = QLabel("👑 PUBLISH TO SOVEREIGN STORE")
        title.setStyleSheet("color: #fabd2f; font-weight: bold; font-size: 16px; margin-bottom: 5px;")
        layout.addWidget(title)
        
        form = QFormLayout()
        form.setSpacing(12)
        
        self.name_in = QLineEdit()
        self.name_in.setPlaceholderText("e.g. Catppuccin Mocha Powerline")
        form.addRow("Theme Name:", self.name_in)
        
        self.author_in = QLineEdit()
        self.author_in.setPlaceholderText("e.g. DaRipper91")
        form.addRow("Author:", self.author_in)
        
        self.desc_in = QTextEdit()
        self.desc_in.setPlaceholderText("Describe your custom layout, aesthetics, and colors...")
        self.desc_in.setMaximumHeight(100)
        form.addRow("Description:", self.desc_in)
        
        self.cat_in = QComboBox()
        self.cat_in.addItems(["Cyberpunk", "Minimalist", "Powerline", "Vibrant", "Neon", "Retro", "Default"])
        form.addRow("Category:", self.cat_in)
        
        layout.addLayout(form)
        
        btn_box = QHBoxLayout()
        btn_box.setSpacing(10)
        
        self.btn_save = QPushButton("SAVE TO STORE")
        self.btn_save.setStyleSheet("background-color: #fabd2f; color: #11111b; font-weight: bold;")
        self.btn_save.clicked.connect(self.accept)
        btn_box.addWidget(self.btn_save, 1)
        
        self.btn_cancel = QPushButton("CANCEL")
        self.btn_cancel.clicked.connect(self.reject)
        btn_box.addWidget(self.btn_cancel, 1)
        
        layout.addLayout(btn_box)

    def get_data(self):
        return {
            "name": self.name_in.text().strip(),
            "author": self.author_in.text().strip(),
            "description": self.desc_in.toPlainText().strip(),
            "category": self.cat_in.currentText()
        }

class InstalledSymbolsDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Installed Symbols Browser")
        self.setMinimumSize(600, 500)
        self.setStyleSheet("""
            QDialog { background-color: #1e1e2e; color: #cdd6f4; font-size: 14px; }
            QLineEdit, QComboBox { background-color: #11111b; border: 1px solid #45475a; padding: 8px; border-radius: 4px; color: #cdd6f4; }
            QLabel { font-weight: bold; color: #a6adc8; }
            QPushButton { background-color: #313244; color: #cdd6f4; border: 1px solid #45475a; font-weight: bold; border-radius: 4px; padding: 6px; }
            QPushButton:hover { background-color: #45475a; }
            QPushButton:disabled { background-color: #1e1e2e; color: #585b70; border: 1px solid #313244; }
        """)
        
        self.selected_symbol = ""
        self.font_files = self.find_system_fonts()
        
        self.symbols = []
        self.filtered_symbols = []
        self.page_size = 120
        self.current_page = 0
        
        self.scan_timer = QTimer(self)
        self.scan_timer.timeout.connect(self.check_scan_status)
        
        l = QVBoxLayout(self)
        l.setSpacing(12)
        
        # Font file chooser
        fl = QHBoxLayout()
        fl.addWidget(QLabel("Select Font:"))
        self.font_combo = QComboBox()
        self.font_combo.addItem("-- All Installed Fonts --")
        self.font_map = {}
        for f in self.font_files:
            name = os.path.basename(f)
            self.font_map[name] = f
            self.font_combo.addItem(name)
        self.font_combo.currentTextChanged.connect(self.load_font_symbols)
        fl.addWidget(self.font_combo, 1)
        l.addLayout(fl)
        
        # Filter input
        self.filter_in = QLineEdit()
        self.filter_in.setPlaceholderText("Filter by symbol hex code (e.g. e700) or text...")
        self.filter_in.textChanged.connect(self.filter_symbols)
        l.addWidget(self.filter_in)
        
        # Symbols Scroll Area
        self.scr = QScrollArea()
        self.scr.setWidgetResizable(True)
        self.scr.setStyleSheet("QScrollArea { border: 1px solid #313244; background: transparent; }")
        self.con = QWidget()
        self.con.setStyleSheet("background: transparent;")
        self.grid = QGridLayout(self.con)
        self.grid.setSpacing(8)
        self.grid.setAlignment(Qt.AlignmentFlag.AlignTop | Qt.AlignmentFlag.AlignLeft)
        self.scr.setWidget(self.con)
        l.addWidget(self.scr)
        
        # Pagination controls
        pl = QHBoxLayout()
        self.btn_prev = QPushButton("◀ PREV")
        self.btn_prev.clicked.connect(self.prev_page)
        pl.addWidget(self.btn_prev)
        
        self.page_label = QLabel("Page 1 of 1 (0 symbols)")
        self.page_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        pl.addWidget(self.page_label, 1)
        
        self.btn_next = QPushButton("NEXT ▶")
        self.btn_next.clicked.connect(self.next_page)
        pl.addWidget(self.btn_next)
        
        l.addLayout(pl)
        
        # Default to loading '-- All Installed Fonts --'
        self.load_font_symbols(self.font_combo.currentText())

    def find_system_fonts(self):
        dirs = [
            "/usr/share/fonts/**/*.ttf",
            "/usr/share/fonts/**/*.otf",
            os.path.expanduser("~/.local/share/fonts/**/*.ttf"),
            os.path.expanduser("~/.local/share/fonts/**/*.otf"),
            os.path.expanduser("~/.fonts/**/*.ttf"),
            os.path.expanduser("~/.fonts/**/*.otf")
        ]
        files = []
        for d in dirs:
            files.extend(glob.glob(d, recursive=True))
        return sorted(list(set(files)))

    def load_font_symbols(self, font_name):
        if font_name == "-- All Installed Fonts --":
            self.symbols = sorted(list(GLOBAL_SYMBOL_CACHE))
            self.filtered_symbols = list(self.symbols)
            self.current_page = 0
            self.display_page()
            
            if GLOBAL_SCANNER_STATUS == "scanning":
                self.scan_timer.start(500)
            else:
                self.scan_timer.stop()
            return

        self.scan_timer.stop()
        font_path = self.font_map.get(font_name)
        if not font_path or not os.path.exists(font_path):
            self.symbols = []
            self.filtered_symbols = []
            self.current_page = 0
            self.display_page()
            return
            
        self.symbols = []
        try:
            font = TTFont(font_path, fontNumber=0, lazy=True)
            cmap = font['cmap']
            chars = set()
            for table in cmap.tables:
                for char_code in table.cmap.keys():
                    if any(start <= char_code <= end for start, end in SYMBOL_RANGES):
                        chars.add(chr(char_code))
            self.symbols = sorted([c for c in chars if c.isprintable() and not c.isspace()])
        except Exception:
            self.symbols = []
            
        self.filtered_symbols = list(self.symbols)
        self.current_page = 0
        self.display_page()

    def check_scan_status(self):
        if self.font_combo.currentText() == "-- All Installed Fonts --":
            self.symbols = sorted(list(GLOBAL_SYMBOL_CACHE))
            self.filter_symbols(self.filter_in.text())
            
            if GLOBAL_SCANNER_STATUS == "done":
                self.scan_timer.stop()

    def filter_symbols(self, text):
        text = text.strip().lower()
        if not text:
            self.filtered_symbols = list(self.symbols)
        else:
            self.filtered_symbols = []
            for s in self.symbols:
                hex_str = f"{ord(s):x}"
                if text in hex_str:
                    self.filtered_symbols.append(s)
                    
        self.current_page = 0
        self.display_page()

    def display_page(self):
        for i in reversed(range(self.grid.count())):
            w = self.grid.itemAt(i).widget()
            if w: w.setParent(None)
            
        start_idx = self.current_page * self.page_size
        end_idx = start_idx + self.page_size
        page_symbols = self.filtered_symbols[start_idx:end_idx]
        
        row = 0
        col = 0
        for s in page_symbols:
            btn = QPushButton(s)
            btn.setFixedSize(40, 40)
            btn.setFont(QFont("Monospace", 14))
            btn.setToolTip(f"Hex: u+{ord(s):04x}")
            btn.clicked.connect(lambda checked=False, val=s: self.select_symbol(val))
            self.grid.addWidget(btn, row, col)
            col += 1
            if col > 11:
                col = 0
                row += 1
                
        total_pages = (len(self.filtered_symbols) + self.page_size - 1) // self.page_size
        status_suffix = ""
        if self.font_combo.currentText() == "-- All Installed Fonts --" and GLOBAL_SCANNER_STATUS == "scanning":
            status_suffix = f" (Scanning: {GLOBAL_SCANNER_PROGRESS}%)"
            
        self.page_label.setText(f"Page {self.current_page + 1} of {max(1, total_pages)} ({len(self.filtered_symbols)} symbols){status_suffix}")
        self.btn_prev.setEnabled(self.current_page > 0)
        self.btn_next.setEnabled(end_idx < len(self.filtered_symbols))

    def prev_page(self):
        if self.current_page > 0:
            self.current_page -= 1
            self.display_page()

    def next_page(self):
        if (self.current_page + 1) * self.page_size < len(self.filtered_symbols):
            self.current_page += 1
            self.display_page()

    def select_symbol(self, glyph):
        self.selected_symbol = glyph
        self.accept()

class ModuleConfigDialog(QDialog):
    updated = Signal(dict)
    def __init__(self, module_id: str, current_config: dict, parent=None):
        super().__init__(parent)
        self.module_id, self.config = module_id, current_config
        self.setWindowTitle(f"Config: {module_id}")
        self.setMinimumWidth(500)
        self.setStyleSheet("""
            QDialog { background-color: #1e1e2e; color: #cdd6f4; font-size: 14px; }
            QLineEdit, QSpinBox { background-color: #11111b; border: 1px solid #45475a; padding: 8px; border-radius: 4px; color: #cdd6f4; }
            QLabel { font-weight: bold; color: #a6adc8; }
            QPushButton { background-color: #313244; color: #cdd6f4; border: 1px solid #45475a; font-weight: bold; border-radius: 4px; }
            QPushButton:hover { background-color: #45475a; }
        """)
        l = QVBoxLayout(self)
        f = QFormLayout()
        f.setSpacing(12)
        
        if module_id == "character":
            self.success_sym_in = QLineEdit(self.config.get("success_symbol", "❯"))
            s_hb = QHBoxLayout()
            s_hb.addWidget(self.success_sym_in, 1)
            btn_br_s = QPushButton("🔣 Symbols...")
            btn_br_s.clicked.connect(lambda: self.browse_symbols(self.success_sym_in))
            s_hb.addWidget(btn_br_s)
            f.addRow("Success Symbol:", s_hb)
            
            s_glyphs = ["❯", "➜", "🚀", "⚡", "❖", "", "λ", "➔", "➤", "✦", "❇", "»"]
            sg_layout = QGridLayout()
            col = 0
            row = 0
            for g in s_glyphs:
                btn = QPushButton(g)
                btn.setFixedSize(30, 30)
                btn.clicked.connect(lambda checked=False, val=g: self.success_sym_in.setText(val))
                sg_layout.addWidget(btn, row, col)
                col += 1
                if col > 5:
                    col = 0
                    row += 1
            f.addRow("Success Glyphs:", sg_layout)
            
            self.error_sym_in = QLineEdit(self.config.get("error_symbol", "✖"))
            e_hb = QHBoxLayout()
            e_hb.addWidget(self.error_sym_in, 1)
            btn_br_e = QPushButton("🔣 Symbols...")
            btn_br_e.clicked.connect(lambda: self.browse_symbols(self.error_sym_in))
            e_hb.addWidget(btn_br_e)
            f.addRow("Error Symbol:", e_hb)
            
            e_glyphs = ["✖", "✗", "💥", "💀", "🛑", "❗", "▲", "✕", "✘", "×"]
            eg_layout = QGridLayout()
            col = 0
            row = 0
            for g in e_glyphs:
                btn = QPushButton(g)
                btn.setFixedSize(30, 30)
                btn.clicked.connect(lambda checked=False, val=g: self.error_sym_in.setText(val))
                eg_layout.addWidget(btn, row, col)
                col += 1
                if col > 5:
                    col = 0
                    row += 1
            f.addRow("Error Glyphs:", eg_layout)
        else:
            self.sym_in = QLineEdit(self.config.get("symbol", ""))
            hb = QHBoxLayout()
            hb.addWidget(self.sym_in, 1)
            btn_br = QPushButton("🔣 Symbols...")
            btn_br.clicked.connect(lambda: self.browse_symbols(self.sym_in))
            hb.addWidget(btn_br)
            f.addRow("Symbol:", hb)
        
        self.sty_in = QLineEdit(self.config.get("style", ""))
        sl = QHBoxLayout()
        sl.addWidget(self.sty_in)
        p = QPushButton("🎨")
        p.setFixedSize(36, 36)
        p.clicked.connect(self.pick)
        sl.addWidget(p)
        f.addRow("Style:", sl)
        
        # Chameleon Palette Grid (FG and BG swatches)
        swatches = [
            ("#f5e0dc", "Rosewater"), ("#f2cdcd", "Flamingo"), ("#f5c2e7", "Pink"), ("#cba6f7", "Mauve"),
            ("#f38ba8", "Red"), ("#fab387", "Peach"), ("#f9e2af", "Yellow"), ("#a6e3a1", "Green"),
            ("#94e2d5", "Teal"), ("#89dceb", "Sky"), ("#74c7ec", "Sapphire"), ("#89b4fa", "Blue"),
            ("#b4befe", "Lavender"), ("#ffffff", "White"), ("#a6adc8", "Subtext"), ("#585b70", "Overlay")
        ]
        
        fg_layout = QGridLayout()
        bg_layout = QGridLayout()
        col = 0
        row = 0
        for hex_code, name in swatches:
            btn_fg = QPushButton()
            btn_fg.setFixedSize(22, 22)
            btn_fg.setStyleSheet(f"background-color: {hex_code}; border: 1px solid #45475a; border-radius: 4px;")
            btn_fg.setToolTip(f"Set FG to {name} ({hex_code})")
            btn_fg.clicked.connect(lambda checked=False, h=hex_code: self._apply_color(f"fg:{h}"))
            fg_layout.addWidget(btn_fg, row, col)
            
            btn_bg = QPushButton()
            btn_bg.setFixedSize(22, 22)
            btn_bg.setStyleSheet(f"background-color: {hex_code}; border: 1px solid #45475a; border-radius: 4px;")
            btn_bg.setToolTip(f"Set BG to {name} ({hex_code})")
            btn_bg.clicked.connect(lambda checked=False, h=hex_code: self._apply_color(f"bg:{h}"))
            bg_layout.addWidget(btn_bg, row, col)
            
            col += 1
            if col > 7:
                col = 0
                row += 1
                
        f.addRow("Text Colors (FG):", fg_layout)
        f.addRow("Block Colors (BG):", bg_layout)
        
        if "truncation_length" in self.config or module_id == "directory":
            self.ts = QSpinBox()
            self.ts.setValue(self.config.get("truncation_length", 3))
            f.addRow("Truncation:", self.ts)
            
        l.addLayout(f)
        b = QPushButton("APPLY CHANGES")
        b.setStyleSheet("background-color: #89b4fa; color: #11111b; font-weight: bold; margin-top: 15px; padding: 12px; font-size: 14px;")
        b.clicked.connect(self.save)
        l.addWidget(b)

    def _apply_color(self, token):
        cur = self.sty_in.text().strip()
        prefix = token.split(":")[0] + ":"
        parts = cur.split()
        updated_parts = [p for p in parts if not p.startswith(prefix)]
        updated_parts.append(token)
        self.sty_in.setText(" ".join(updated_parts).strip())

    def browse_symbols(self, target_edit):
        d = InstalledSymbolsDialog(self)
        if d.exec():
            if d.selected_symbol:
                target_edit.setText(d.selected_symbol)

    def pick(self):
        c = QColorDialog.getColor()
        if c.isValid(): self._apply_color(f"fg:{c.name()}")
        
    def save(self):
        if self.module_id == "character":
            d = {
                "success_symbol": self.success_sym_in.text(),
                "error_symbol": self.error_sym_in.text(),
                "style": self.sty_in.text()
            }
        else:
            d = {"symbol": self.sym_in.text(), "style": self.sty_in.text()}
            if hasattr(self, 'ts'): d["truncation_length"] = self.ts.value()
        self.updated.emit(d); self.accept()

class ModuleCard(QFrame):
    config_clicked = Signal(str)
    def __init__(self, m_id, name, desc="", parent=None):
        super().__init__(parent)
        self.m_id = m_id
        self.setStyleSheet("""
            ModuleCard {
                background-color: #24273a;
                border-radius: 6px;
                border: 1px solid #313244;
                margin-bottom: 4px;
            }
            ModuleCard:hover { border: 1px solid #89b4fa; background-color: #313244; }
        """)
        l = QHBoxLayout(self)
        l.setContentsMargins(15, 12, 15, 12)
        
        handle = QLabel("⋮⋮")
        handle.setStyleSheet("color: #585b70; font-size: 18px; margin-right: 10px;")
        l.addWidget(handle)
        
        il = QVBoxLayout()
        nl = QLabel(f"{name}")
        nl.setStyleSheet("color: #cdd6f4; font-weight: bold; font-size: 15px;")
        il.addWidget(nl)
        
        if desc:
            dl = QLabel(desc)
            dl.setStyleSheet("color: #a6adc8; font-size: 12px;")
            il.addWidget(dl)
            
        l.addLayout(il)
        
        b = QPushButton("⚙")
        b.setFixedSize(36, 36)
        b.setStyleSheet("""
            QPushButton { background-color: #313244; color: #cdd6f4; border-radius: 6px; font-size: 16px; border: 1px solid #45475a; }
            QPushButton:hover { background-color: #89b4fa; color: #11111b; border: none; }
        """)
        b.clicked.connect(lambda: self.config_clicked.emit(self.m_id))
        l.addWidget(b)

class StoreThemeCard(QFrame):
    applied = Signal(dict)
    def __init__(self, data, parent=None):
        super().__init__(parent)
        self.data = data
        self.setStyleSheet("""
            StoreThemeCard {
                background-color: #24273a;
                border-radius: 8px;
                border: 1px solid #313244;
                margin-bottom: 15px;
            }
            StoreThemeCard:hover { border: 1px solid #cba6f7; }
        """)
        l = QVBoxLayout(self)
        l.setContentsMargins(20, 15, 20, 15)
        
        h = QHBoxLayout()
        nl = QLabel(data['name'])
        nl.setStyleSheet("color: #cba6f7; font-weight: bold; font-size: 16px; border: none;")
        h.addWidget(nl)
        
        sl = QLabel(f"★ {data['stars']}")
        sl.setStyleSheet("color: #f9e2af; font-weight: bold; font-size: 14px; border: none;")
        h.addWidget(sl, 0, Qt.AlignmentFlag.AlignRight)
        l.addLayout(h)
        
        d = QLabel(data['description'])
        d.setStyleSheet("color: #bac2de; font-size: 13px; border: none; margin-top: 5px; margin-bottom: 10px;")
        d.setWordWrap(True)
        l.addWidget(d)
        
        b = QPushButton("APPLY THEME")
        b.setStyleSheet("""
            QPushButton { background-color: #45475a; color: #cdd6f4; font-weight: bold; padding: 10px; border-radius: 6px; }
            QPushButton:hover { background-color: #cba6f7; color: #11111b; }
        """)
        b.clicked.connect(lambda: self.applied.emit(self.data))
        l.addWidget(b)

class EditorPanel(QWidget):
    save_req = Signal(); save_to_store_req = Signal(); order_ch = Signal(list); theme_app = Signal(dict); mod_cfg_req = Signal(str); img_ex_req = Signal(str)
    scenarios_ch = Signal(dict); apply_symbol_req = Signal(str, str)
    load_toml_req = Signal(); save_as_req = Signal()
    def __init__(self, parent=None):
        super().__init__(parent)
        self.db = DatabaseManager()
        l = QVBoxLayout(self)
        l.setContentsMargins(15, 15, 15, 15)
        
        # File toolbar header
        tb = QHBoxLayout()
        self.file_label = QLabel("Active File: ~/.config/starship.toml")
        self.file_label.setStyleSheet("color: #a6adc8; font-family: monospace; font-size: 12px;")
        tb.addWidget(self.file_label, 1)
        
        btn_load = QPushButton("📂 OPEN TOML")
        btn_load.setStyleSheet("""
            QPushButton { background-color: #313244; color: #cdd6f4; font-size: 11px; padding: 6px 12px; border-radius: 4px; border: 1px solid #45475a; }
            QPushButton:hover { background-color: #45475a; }
        """)
        btn_load.clicked.connect(self.load_toml_req.emit)
        tb.addWidget(btn_load)
        
        btn_save_as = QPushButton("💾 SAVE AS...")
        btn_save_as.setStyleSheet("""
            QPushButton { background-color: #313244; color: #cdd6f4; font-size: 11px; padding: 6px 12px; border-radius: 4px; border: 1px solid #45475a; }
            QPushButton:hover { background-color: #45475a; }
        """)
        btn_save_as.clicked.connect(self.save_as_req.emit)
        tb.addWidget(btn_save_as)
        
        btn_save_store = QPushButton("👑 SAVE TO STORE")
        btn_save_store.setStyleSheet("""
            QPushButton { background-color: #fabd2f; color: #11111b; font-size: 11px; padding: 6px 12px; border-radius: 4px; border: 1px solid #fabd2f; font-weight: bold; }
            QPushButton:hover { background-color: #f9e2af; }
        """)
        btn_save_store.clicked.connect(self.save_to_store_req.emit)
        tb.addWidget(btn_save_store)
        
        l.addLayout(tb)
        
        self.tabs = QTabWidget()
        self.tabs.setStyleSheet("""
            QTabWidget::pane { border: 1px solid #313244; background: #1e1e2e; border-radius: 0px 4px 4px 4px; }
            QTabBar::tab { background: #11111b; color: #a6adc8; padding: 12px 25px; font-weight: bold; font-size: 14px; border: 1px solid #313244; border-bottom: none; border-top-left-radius: 6px; border-top-right-radius: 6px; margin-right: 2px;}
            QTabBar::tab:selected { background: #1e1e2e; color: #89b4fa; }
        """)
        l.addWidget(self.tabs)
        
        # Interchange
        self.m_tab = QWidget()
        ml = QVBoxLayout(self.m_tab)
        ml.setContentsMargins(20, 20, 20, 20)
        self.m_list = QListWidget()
        self.m_list.setDragDropMode(QAbstractItemView.DragDropMode.InternalMove)
        self.m_list.model().rowsMoved.connect(self._moved)
        self.m_list.setStyleSheet("QListWidget { background: transparent; border: none; } QListWidget::item { margin-bottom: 5px; }")
        ml.addWidget(self.m_list)
        self.tabs.addTab(self.m_tab, "INTERCHANGE")
        
        # Store
        self.s_tab = QWidget()
        sl = QVBoxLayout(self.s_tab)
        sl.setContentsMargins(20, 20, 20, 20)
        
        header_layout = QHBoxLayout()
        self.s_in = QLineEdit()
        self.s_in.setPlaceholderText("Search Sovereign Store...")
        self.s_in.textChanged.connect(self.refresh_store)
        self.s_in.setStyleSheet("background-color: #11111b; border: 1px solid #45475a; padding: 12px; color: #cdd6f4; border-radius: 6px; font-size: 14px;")
        header_layout.addWidget(self.s_in)
        
        cb = QPushButton("🦎 CHAMELEON")
        cb.setStyleSheet("""
            QPushButton { background-color: #fabd2f; color: #11111b; font-weight: bold; padding: 12px 20px; border-radius: 6px; }
            QPushButton:hover { background-color: #f9e2af; }
        """)
        cb.clicked.connect(self._cham)
        header_layout.addWidget(cb)
        sl.addLayout(header_layout)
        
        self.s_scr = QScrollArea()
        self.s_scr.setWidgetResizable(True)
        self.s_scr.setStyleSheet("QScrollArea { border: none; background: transparent; margin-top: 15px; }")
        self.s_con = QWidget()
        self.s_con.setStyleSheet("background: transparent;")
        self.s_grd = QVBoxLayout(self.s_con)
        self.s_grd.setAlignment(Qt.AlignmentFlag.AlignTop)
        self.s_grd.setContentsMargins(0,0,10,0)
        self.s_scr.setWidget(self.s_con)
        sl.addWidget(self.s_scr)
        self.tabs.addTab(self.s_tab, "SOVEREIGN STORE")
        
        # Settings & Scenarios Tab
        self.sc_tab = QWidget()
        scl = QVBoxLayout(self.sc_tab)
        scl.setContentsMargins(20, 20, 20, 20)
        scl.setSpacing(12)
        scl.setAlignment(Qt.AlignmentFlag.AlignTop)
        
        title_label = QLabel("PROMPT SETTINGS & SCENARIOS")
        title_label.setStyleSheet("color: #89b4fa; font-weight: bold; font-size: 16px; margin-bottom: 5px;")
        scl.addWidget(title_label)
        
        desc_label = QLabel("Simulate prompt segments rendering dynamically based on standard shell environments, toolchain state, and prompt structures.")
        desc_label.setWordWrap(True)
        desc_label.setStyleSheet("color: #a6adc8; font-size: 13px; margin-bottom: 15px;")
        scl.addWidget(desc_label)
        
        checkbox_style = """
            QCheckBox { color: #cdd6f4; font-size: 14px; spacing: 10px; }
            QCheckBox::indicator { width: 20px; height: 20px; border: 1px solid #45475a; border-radius: 4px; background-color: #11111b; }
            QCheckBox::indicator:checked { background-color: #89b4fa; image: none; }
        """
        
        # Prompt Layout Settings Group
        layout_group = QGroupBox("PROMPT LAYOUT SETTINGS")
        layout_group.setStyleSheet("""
            QGroupBox { border: 1px solid #313244; border-radius: 6px; margin-top: 15px; padding-top: 20px; font-weight: bold; color: #cba6f7; }
            QGroupBox::title { subcontrol-origin: margin; left: 10px; padding: 0 5px; }
        """)
        l_gl = QVBoxLayout(layout_group)
        l_gl.setSpacing(10)
        
        self.cb_double_line = QCheckBox("Double-Lined Prompt")
        self.cb_double_line.setChecked(True)
        self.cb_double_line.setStyleSheet(checkbox_style)
        self.cb_double_line.stateChanged.connect(self._sc_changed)
        l_gl.addWidget(self.cb_double_line)
        
        self.cb_right_prompt = QCheckBox("Enable Right-Side Prompt")
        self.cb_right_prompt.setChecked(False)
        self.cb_right_prompt.setStyleSheet(checkbox_style)
        self.cb_right_prompt.stateChanged.connect(self._sc_changed)
        l_gl.addWidget(self.cb_right_prompt)
        
        scl.addWidget(layout_group)
        
        # Environmental Simulation Group
        sim_group = QGroupBox("ENVIRONMENT SIMULATION")
        sim_group.setStyleSheet("""
            QGroupBox { border: 1px solid #313244; border-radius: 6px; margin-top: 15px; padding-top: 20px; font-weight: bold; color: #89b4fa; }
            QGroupBox::title { subcontrol-origin: margin; left: 10px; padding: 0 5px; }
        """)
        s_gl = QVBoxLayout(sim_group)
        s_gl.setSpacing(10)
        
        sc_definitions = [
            ("git", "Git Repository Status (Active Branch/Index)", True),
            ("python", "Python Project (Active Python Virtualenv)", False),
            ("node", "Node.js Project (Active package.json)", False),
            ("rust", "Rust Project (Cargo toolchain active)", False),
            ("docker", "Docker Context Active", False),
            ("duration", "Command Execution Duration (>2.0s)", False),
            ("error", "Error State (Exit Code != 0)", False)
        ]
        
        self.sc_cbs = {}
        for key, label, default in sc_definitions:
            cb = QCheckBox(label)
            cb.setChecked(default)
            cb.setStyleSheet(checkbox_style)
            cb.stateChanged.connect(self._sc_changed)
            s_gl.addWidget(cb)
            self.sc_cbs[key] = cb
            
        scl.addWidget(sim_group)
        
        self.tabs.addTab(self.sc_tab, "SETTINGS & SCENARIOS")
        
        # Symbols Tab
        self.symbols_dict = {
            "Git / VCS": [
                ("", "Branch"), ("", "Merge"), ("", "Git Logo"), ("", "GitHub"), 
                ("", "GitLab"), ("", "User Info"), ("", "Commit"), ("", "Added Line"),
                ("", "Modified Line"), ("", "Removed Line"), ("", "Detached"), ("", "Untracked"),
                ("", "Pull Request"), ("", "Git Stash"), ("", "Git Branch Alt")
            ],
            "Files & Folders": [
                ("", "Folder"), ("", "Folder Open"), ("", "File Generic"), ("", "File Text"), 
                ("", "File Code"), ("", "Locked/ReadOnly"), ("", "Shield Secure"), ("", "Document"),
                ("", "Folder Shared"), ("", "Folder Zip"), ("", "File Binary"), ("", "File Archive"),
                ("", "File PDF")
            ],
            "OS & Distros": [
                ("", "Linux Kernel"), ("", "Windows"), ("", "macOS"), ("", "Arch Linux"), 
                ("", "Fedora"), ("", "Ubuntu Distro"), ("", "Debian"), ("", "Gentoo"),
                ("", "Red Hat"), ("", "Alpine Linux"), ("", "openSUSE"), ("", "CentOS"),
                ("", "Void Linux"), ("", "Linux Mint"), ("", "Elementary OS"), ("", "Kali Linux"),
                ("", "NixOS"), ("", "Manjaro"), ("", "AlmaLinux")
            ],
            "Languages & Tech": [
                ("", "Python"), ("", "NodeJS / Javascript"), ("", "Rust Cargo"), ("", "Go Language"), 
                ("", "C Header"), ("", "C++"), ("", "Java"), ("", "Lua"), ("", "HTML"),
                ("", "CSS"), ("", "TypeScript"), ("", "Config Gear"), ("", "PHP"),
                ("", "Ruby"), ("", "Docker"), ("", "Shell Script"), ("", "Elixir"),
                ("", "Vim"), ("", "Android"), ("", "Swift"), ("", "Microsoft .NET"),
                ("", "Database / SQL"), ("", "AWS"), ("", "Kubernetes")
            ],
            "Character Glyphs": [
                ("❯", "Heavy Angle"), ("➜", "Arrow"), ("🚀", "Rocket"), ("⚡", "Lightning"), 
                ("❖", "Diamond"), ("λ", "Lambda"), ("➔", "Thin Arrow"), ("➤", "Pointer"), 
                ("✦", "Sparkle"), ("❇", "Asterisk"), ("»", "Double Angle"), ("✖", "Cross Fail"), 
                ("✗", "Ballot Cross"), ("💥", "Explosion"), ("💀", "Skull"), ("🛑", "Stop Sign"),
                ("", "Chevron Right"), ("", "Arrow Right"), ("", "Chevron Heavy Right"),
                ("", "Right Arrow Bold"), ("", "Planet"), ("🌀", "Cyclone"), ("✨", "Sparkles"),
                ("🪐", "Saturn"), ("🍀", "Four Leaf Clover"), ("👽", "Alien"), ("👾", "Alien Monster"),
                ("🛸", "UFO"), ("⚓", "Anchor"), ("🎯", "Target"), ("🔮", "Crystal Ball")
            ],
            "Misc / Info": [
                ("", "Time / Clock"), ("", "Calendar"), ("", "Server / Node"), ("", "Terminal Prompt"), 
                ("", "Snowflake / Freeze"), ("🔥", "Fire"), ("", "Moon Mode"), ("", "Sun Mode"), 
                ("", "Package Generic"), ("ﮮ", "Sync Mode"), ("", "CPU Stats"), ("", "Memory Stats"),
                ("", "PC / Monitor"), ("", "Plug / Connected"), ("🔋", "Battery"), ("📶", "Signal"),
                ("", "Globe"), ("", "Network"), ("", "Key"), ("", "Lock"), ("", "Tag / Release"),
                ("🔔", "Bell / Notification")
            ],
            "Powerline Connectors": [
                ("", "Angled Right Solid"), ("", "Angled Left Solid"),
                ("", "Curved Right Solid"), ("", "Curved Left Solid"),
                ("", "Angled Right Thin"), ("", "Angled Left Thin"),
                ("", "Curved Right Thin"), ("", "Curved Left Thin"),
                ("", "Slanted Down Right Solid"), ("", "Slanted Up Left Solid"),
                ("", "Slanted Down Right Thin"), ("", "Slanted Up Left Thin"),
                ("", "Slanted Down Left Solid"), ("", "Slanted Up Right Solid"),
                ("", "Slanted Down Left Thin"), ("", "Slanted Up Right Thin")
            ]
        }
        
        self.sy_tab = QWidget()
        syl = QVBoxLayout(self.sy_tab)
        syl.setContentsMargins(20, 20, 20, 20)
        syl.setSpacing(10)
        
        sh_layout = QHBoxLayout()
        sh_layout.addWidget(QLabel("Category:"))
        self.sy_cat = QComboBox()
        self.sy_cat.addItems(list(self.symbols_dict.keys()))
        self.sy_cat.currentTextChanged.connect(self._refresh_symbols)
        self.sy_cat.setStyleSheet("background-color: #11111b; border: 1px solid #45475a; padding: 6px; border-radius: 4px; color: #cdd6f4;")
        sh_layout.addWidget(self.sy_cat)
        syl.addLayout(sh_layout)
        
        self.sy_scr = QScrollArea()
        self.sy_scr.setWidgetResizable(True)
        self.sy_scr.setStyleSheet("QScrollArea { border: none; background: transparent; }")
        self.sy_con = QWidget()
        self.sy_con.setStyleSheet("background: transparent;")
        self.sy_grd = QGridLayout(self.sy_con)
        self.sy_grd.setSpacing(10)
        self.sy_grd.setAlignment(Qt.AlignmentFlag.AlignTop | Qt.AlignmentFlag.AlignLeft)
        self.sy_scr.setWidget(self.sy_con)
        syl.addWidget(self.sy_scr)
        
        sa_layout = QVBoxLayout()
        sa_layout.setSpacing(8)
        
        self.sy_sel_label = QLabel("Selected: None")
        self.sy_sel_label.setStyleSheet("color: #fab387; font-weight: bold; font-size: 14px; padding-top: 5px;")
        sa_layout.addWidget(self.sy_sel_label)
        
        sa_grid = QGridLayout()
        apply_modules = [
            ("os", "OS"), ("username", "User"), ("hostname", "Host"), ("directory", "Dir"),
            ("git_branch", "Branch"), ("git_status", "Git Stat"), ("python", "Python"),
            ("nodejs", "Node.js"), ("rust", "Rust"), ("docker_context", "Docker"),
            ("cmd_duration", "Duration"), ("status", "Status"), ("character", "Character")
        ]
        
        row = 0
        col = 0
        for mid, label in apply_modules:
            btn = QPushButton(f"Apply to {label}")
            btn.setStyleSheet("""
                QPushButton { background-color: #313244; color: #cdd6f4; font-size: 11px; padding: 8px; border-radius: 4px; border: 1px solid #45475a; }
                QPushButton:hover { background-color: #89b4fa; color: #11111b; border: none; }
            """)
            btn.clicked.connect(lambda checked=False, m=mid: self._apply_symbol_to_module(m))
            sa_grid.addWidget(btn, row, col)
            col += 1
            if col > 2:
                col = 0
                row += 1
        sa_layout.addLayout(sa_grid)
        syl.addLayout(sa_layout)
        
        self.tabs.addTab(self.sy_tab, "SYMBOLS")
        self.selected_symbol = ""
        self._refresh_symbols(self.sy_cat.currentText())
        
        self.pop_mods()
        self.refresh_store()
        
        sb = QPushButton("💾 SAVE CONFIGURATION")
        sb.setStyleSheet("""
            QPushButton { background-color: #a6e3a1; color: #11111b; font-weight: bold; font-size: 15px; padding: 15px; border-radius: 8px; margin-top: 10px; }
            QPushButton:hover { background-color: #94e2d5; }
        """)
        sb.clicked.connect(self.save_req.emit)
        l.addWidget(sb)

    def _moved(self, *a):
        o = []
        for i in range(self.m_list.count()):
            w = self.m_list.itemWidget(self.m_list.item(i))
            if w: o.append(w.m_id)
        self.order_ch.emit(o)

    def _cham(self):
        f, _ = QFileDialog.getOpenFileName(self, "Select Wallpaper", "", "Images (*.png *.jpg *.jpeg)")
        if f: self.img_ex_req.emit(f)

    def pop_mods(self, current_order: list = None):
        self.m_list.clear()
        ms = [
            ("os", "Operating System", "Detected OS icon"),
            ("username", "User", "Current user name"),
            ("hostname", "Host", "System hostname"),
            ("directory", "Directory", "Current path"),
            ("git_branch", "Git Branch", "Active branch"),
            ("git_status", "Git Status", "Index state"),
            ("python", "Python", "Runtime version"),
            ("nodejs", "Node.js", "JS version"),
            ("rust", "Rust", "Cargo version"),
            ("docker_context", "Docker", "Active context"),
            ("cmd_duration", "Duration", "Execution time"),
            ("status", "Exit Status", "Success/Error codes"),
            ("character", "Prompt Character", "The main input glyph")
        ]
        ms_map = {item[0]: item for item in ms}
        ordered_items = []
        if current_order:
            for mid in current_order:
                if mid in ms_map:
                    ordered_items.append(ms_map.pop(mid))
        remaining_items = list(ms_map.values())
        final_list = ordered_items + remaining_items
        for mid, n, d in final_list:
            it = QListWidgetItem(self.m_list)
            it.setSizeHint(QSize(0, 80))
            self.m_list.addItem(it)
            c = ModuleCard(mid, n, d)
            c.config_clicked.connect(self.mod_cfg_req.emit)
            self.m_list.setItemWidget(it, c)

    def refresh_store(self):
        q = self.s_in.text().lower()
        for i in reversed(range(self.s_grd.count())): 
            w = self.s_grd.itemAt(i).widget()
            if w: w.setParent(None)
        for t in self.db.get_all_themes():
            if q in t["name"].lower() or q in t["description"].lower():
                c = StoreThemeCard(t)
                c.applied.connect(self.theme_app.emit)
                self.s_grd.addWidget(c)

    def _sc_changed(self, state):
        state_dict = {k: cb.isChecked() for k, cb in self.sc_cbs.items()}
        state_dict["multiline"] = self.cb_double_line.isChecked()
        state_dict["right_prompt"] = self.cb_right_prompt.isChecked()
        self.scenarios_ch.emit(state_dict)

    def _refresh_symbols(self, cat_name):
        for i in reversed(range(self.sy_grd.count())): 
            w = self.sy_grd.itemAt(i).widget()
            if w: w.setParent(None)
            
        glyphs = self.symbols_dict.get(cat_name, [])
        row = 0
        col = 0
        for glyph, desc in glyphs:
            btn = QPushButton(glyph)
            btn.setFixedSize(50, 50)
            btn.setStyleSheet("""
                QPushButton { background-color: #24273a; color: #cdd6f4; font-size: 20px; font-weight: bold; border-radius: 6px; border: 1px solid #313244; }
                QPushButton:hover { background-color: #89b4fa; color: #11111b; border: 1px solid #89b4fa; }
                QPushButton:checked { background-color: #fab387; color: #11111b; border: 1px solid #fab387; }
            """)
            btn.setToolTip(desc)
            btn.setCheckable(True)
            btn.clicked.connect(lambda checked=False, g=glyph: self._select_symbol(g))
            self.sy_grd.addWidget(btn, row, col)
            col += 1
            if col > 5:
                col = 0
                row += 1

    def _select_symbol(self, glyph):
        for i in range(self.sy_grd.count()):
            w = self.sy_grd.itemAt(i).widget()
            if isinstance(w, QPushButton):
                w.setChecked(w.text() == glyph)
        self.selected_symbol = glyph
        self.sy_sel_label.setText(f"Selected: {glyph}")

    def _apply_symbol_to_module(self, mid):
        if not self.selected_symbol:
            return
        self.apply_symbol_req.emit(mid, self.selected_symbol)

    def set_active_file(self, path):
        display_path = path.replace(os.path.expanduser("~"), "~")
        self.file_label.setText(f"Active File: {display_path}")

    def set_layout_state(self, multiline: bool, right_prompt: bool):
        self.cb_double_line.blockSignals(True)
        self.cb_right_prompt.blockSignals(True)
        self.cb_double_line.setChecked(multiline)
        self.cb_right_prompt.setChecked(right_prompt)
        self.cb_double_line.blockSignals(False)
        self.cb_right_prompt.blockSignals(False)
