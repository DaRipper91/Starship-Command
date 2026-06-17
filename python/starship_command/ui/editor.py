from PySide6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QScrollArea, QFrame, QLineEdit,
    QListWidget, QListWidgetItem, QAbstractItemView,
    QTabWidget, QFileDialog, QDialog, QFormLayout,
    QColorDialog, QSpinBox, QGridLayout, QCheckBox
)
from PySide6.QtCore import Qt, Signal, QSize
from starship_command.core.database import DatabaseManager

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
            f.addRow("Success Symbol:", self.success_sym_in)
            
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
            f.addRow("Error Symbol:", self.error_sym_in)
            
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
            f.addRow("Symbol:", self.sym_in)
        
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
    save_req = Signal(); order_ch = Signal(list); theme_app = Signal(dict); mod_cfg_req = Signal(str); img_ex_req = Signal(str)
    scenarios_ch = Signal(dict)
    def __init__(self, parent=None):
        super().__init__(parent)
        self.db = DatabaseManager()
        l = QVBoxLayout(self)
        l.setContentsMargins(15, 15, 15, 15)
        
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
        
        # Scenarios Tab
        self.sc_tab = QWidget()
        scl = QVBoxLayout(self.sc_tab)
        scl.setContentsMargins(20, 20, 20, 20)
        scl.setSpacing(12)
        scl.setAlignment(Qt.AlignmentFlag.AlignTop)
        
        title_label = QLabel("VORTEX SCENARIO ENGINE")
        title_label.setStyleSheet("color: #89b4fa; font-weight: bold; font-size: 16px; margin-bottom: 5px;")
        scl.addWidget(title_label)
        
        desc_label = QLabel("Simulate prompt segments rendering dynamically based on standard shell environments and toolchain state.")
        desc_label.setWordWrap(True)
        desc_label.setStyleSheet("color: #a6adc8; font-size: 13px; margin-bottom: 15px;")
        scl.addWidget(desc_label)
        
        self.sc_cbs = {}
        sc_definitions = [
            ("git", "Git Repository Status (Active Branch/Index)", True),
            ("python", "Python Project (Active Python Virtualenv)", False),
            ("node", "Node.js Project (Active package.json)", False),
            ("rust", "Rust Project (Cargo toolchain active)", False),
            ("docker", "Docker Context Active", False),
            ("duration", "Command Execution Duration (>2.0s)", False),
            ("error", "Error State (Exit Code != 0)", False)
        ]
        
        checkbox_style = """
            QCheckBox { color: #cdd6f4; font-size: 14px; spacing: 10px; }
            QCheckBox::indicator { width: 20px; height: 20px; border: 1px solid #45475a; border-radius: 4px; background-color: #11111b; }
            QCheckBox::indicator:checked { background-color: #89b4fa; image: none; }
        """
        
        for key, label, default in sc_definitions:
            cb = QCheckBox(label)
            cb.setChecked(default)
            cb.setStyleSheet(checkbox_style)
            cb.stateChanged.connect(self._sc_changed)
            scl.addWidget(cb)
            self.sc_cbs[key] = cb
            
        self.tabs.addTab(self.sc_tab, "SCENARIOS")
        
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
        self.scenarios_ch.emit(state_dict)
