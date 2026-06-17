from PySide6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QScrollArea, QFrame, QLineEdit,
    QListWidget, QListWidgetItem, QAbstractItemView,
    QTabWidget, QFileDialog, QDialog, QFormLayout,
    QColorDialog, QSpinBox
)
from PySide6.QtCore import Qt, Signal, QSize
from starship_command.core.database import DatabaseManager

class ModuleConfigDialog(QDialog):
    updated = Signal(dict)
    def __init__(self, module_id: str, current_config: dict, parent=None):
        super().__init__(parent)
        self.module_id, self.config = module_id, current_config
        self.setWindowTitle(f"Config: {module_id}")
        self.setMinimumWidth(400)
        self.setStyleSheet("background-color: #1e1e2e; color: #cdd6f4;")
        l = QVBoxLayout(self)
        f = QFormLayout()
        self.sym_in = QLineEdit(self.config.get("symbol", "")); f.addRow("Symbol:", self.sym_in)
        self.sty_in = QLineEdit(self.config.get("style", ""))
        sl = QHBoxLayout(); sl.addWidget(self.sty_in)
        p = QPushButton("🎨"); p.setFixedWidth(40); p.clicked.connect(self.pick); sl.addWidget(p)
        f.addRow("Style:", sl)
        if "truncation_length" in self.config or module_id == "directory":
            self.ts = QSpinBox(); self.ts.setValue(self.config.get("truncation_length", 3)); f.addRow("Truncation:", self.ts)
        l.addLayout(f)
        b = QPushButton("APPLY"); b.setStyleSheet("background-color: #a6e3a1; color: #11111b; font-weight: bold; padding: 10px;"); b.clicked.connect(self.save); l.addWidget(b)
    def pick(self):
        c = QColorDialog.getColor()
        if c.isValid(): self.sty_in.setText(f"{self.sty_in.text()} fg:{c.name()}".strip())
    def save(self):
        d = {"symbol": self.sym_in.text(), "style": self.sty_in.text()}
        if hasattr(self, 'ts'): d["truncation_length"] = self.ts.value()
        self.updated.emit(d); self.accept()

class ModuleCard(QFrame):
    config_clicked = Signal(str)
    def __init__(self, m_id, name, desc="", parent=None):
        super().__init__(parent)
        self.m_id = m_id
        self.setStyleSheet("background-color: #313244; border-radius: 8px; border: 1px solid #45475a;")
        l = QHBoxLayout(self)
        l.addWidget(QLabel("⋮⋮"))
        il = QVBoxLayout(); il.addWidget(QLabel(f"<b>{name}</b>")); il.addWidget(QLabel(desc))
        l.addLayout(il)
        b = QPushButton("⚙"); b.setFixedSize(30,30); b.clicked.connect(lambda: self.config_clicked.emit(self.m_id)); l.addWidget(b)

class StoreThemeCard(QFrame):
    applied = Signal(dict)
    def __init__(self, data, parent=None):
        super().__init__(parent)
        self.data = data
        self.setStyleSheet("background-color: #313244; border-radius: 10px; border: 1px solid #45475a; margin-bottom: 5px;")
        l = QVBoxLayout(self)
        h = QHBoxLayout(); h.addWidget(QLabel(f"<b>{data['name'].upper()}</b>")); h.addWidget(QLabel(f"★ {data['stars']}")); l.addLayout(h)
        d = QLabel(data["description"]); d.setWordWrap(True); l.addWidget(d)
        b = QPushButton("INSTALL / APPLY"); b.clicked.connect(lambda: self.applied.emit(self.data)); l.addWidget(b)

class EditorPanel(QWidget):
    save_req = Signal(); order_ch = Signal(list); theme_app = Signal(dict); mod_cfg_req = Signal(str); img_ex_req = Signal(str)
    def __init__(self, parent=None):
        super().__init__(parent)
        self.db = DatabaseManager(); l = QVBoxLayout(self); self.tabs = QTabWidget(); l.addWidget(self.tabs)
        
        # Interchange
        self.m_tab = QWidget(); ml = QVBoxLayout(self.m_tab); self.m_list = QListWidget()
        self.m_list.setDragDropMode(QAbstractItemView.DragDropMode.InternalMove)
        self.m_list.model().rowsMoved.connect(self._moved)
        ml.addWidget(self.m_list); self.tabs.addTab(self.m_tab, "INTERCHANGE")
        
        # Store
        self.s_tab = QWidget(); sl = QVBoxLayout(self.s_tab)
        cb = QPushButton("🦎 CHAMELEON ENGINE"); cb.clicked.connect(self._cham); sl.addWidget(cb)
        self.s_in = QLineEdit(); self.s_in.setPlaceholderText("Search Store..."); self.s_in.textChanged.connect(self.refresh_store); sl.addWidget(self.s_in)
        self.s_scr = QScrollArea(); self.s_scr.setWidgetResizable(True); self.s_con = QWidget(); self.s_grd = QVBoxLayout(self.s_con)
        self.s_grd.setAlignment(Qt.AlignmentFlag.AlignTop); self.s_scr.setWidget(self.s_con); sl.addWidget(self.s_scr)
        self.tabs.addTab(self.s_tab, "SOVEREIGN STORE")
        
        self.pop_mods(); self.refresh_store()
        sb = QPushButton("💾 SAVE CONFIG"); sb.clicked.connect(self.save_req.emit); l.addWidget(sb)

    def _moved(self, *a):
        o = []
        for i in range(self.m_list.count()):
            w = self.m_list.itemWidget(self.m_list.item(i))
            if w: o.append(w.m_id)
        self.order_ch.emit(o)

    def _cham(self):
        f, _ = QFileDialog.getOpenFileName(self, "Select Wallpaper", "", "Images (*.png *.jpg *.jpeg)")
        if f: self.img_ex_req.emit(f)

    def pop_mods(self):
        ms = [("os","OS",""),("directory","Dir",""),("git_branch","Git",""),("python","Py",""),("nodejs","JS",""),("cmd_duration","Dur","")]
        for mid, n, d in ms:
            it = QListWidgetItem(self.m_list); it.setSizeHint(QSize(0,60)); self.m_list.addItem(it)
            c = ModuleCard(mid, n, d); c.config_clicked.connect(self.mod_cfg_req.emit); self.m_list.setItemWidget(it, c)

    def refresh_store(self):
        q = self.s_in.text().lower()
        for i in reversed(range(self.s_grd.count())): self.s_grd.itemAt(i).widget().setParent(None)
        for t in self.db.get_all_themes():
            if q in t["name"].lower() or q in t["description"].lower():
                c = StoreThemeCard(t); c.applied.connect(self.theme_app.emit); self.s_grd.addWidget(c)
