import sys, os, shutil
from PySide6.QtWidgets import QApplication, QMainWindow, QSplitter, QStatusBar, QLabel, QMessageBox
from PySide6.QtCore import Qt
from starship_command.ui.viewport import VortexViewport
from starship_command.ui.editor import EditorPanel, ModuleConfigDialog
from starship_command.core.parser import TomlParser
from starship_command.core.sync import AuraLink
from starship_command.core.colors import ColorUtils

class StarshipCommandApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Starship Command // Unified Engine")
        self.setMinimumSize(1200, 800)
        self.config = TomlParser.get_default_config()
        self.current_order = TomlParser.get_order_from_format(self.config.format)
        
        self.setStyleSheet("QMainWindow { background-color: #1e1e2e; } QWidget { color: #cdd6f4; } QStatusBar { background-color: #181825; }")
        sp = QSplitter(Qt.Orientation.Horizontal); self.setCentralWidget(sp)
        self.ed = EditorPanel(); self.ed.save_req.connect(self.save); self.ed.order_ch.connect(self.order_ch); self.ed.theme_app.connect(self.apply_theme); self.ed.mod_cfg_req.connect(self.show_cfg); self.ed.img_ex_req.connect(self.extract)
        sp.addWidget(self.ed); self.vp = VortexViewport(); sp.addWidget(self.vp); sp.setStretchFactor(0, 1); sp.setStretchFactor(1, 2)
        
        self.sb = QStatusBar(); self.setStatusBar(self.sb); self.ind = QLabel(" TENSOR-NATIVE "); self.ind.setStyleSheet("background: #f38ba8; color: #11111b; font-weight: bold;"); self.sb.addPermanentWidget(self.ind)
        self.sync = AuraLink(); self.sync.start(); self.update_vp()

    def order_ch(self, o): self.current_order = o; self.update_vp()

    def show_cfg(self, mid):
        cfg = getattr(self.config, mid, {}) or self.config.modules.get(mid, {})
        d = ModuleConfigDialog(mid, cfg, self)
        d.updated.connect(lambda n: self.update_cfg(mid, n)); d.exec()

    def update_cfg(self, mid, n):
        if hasattr(self.config, mid): setattr(self.config, mid, n)
        else: self.config.modules[mid] = n
        self.update_vp()

    def apply_theme(self, data):
        try:
            self.config, _ = TomlParser.parse(data["config_toml"])
            self.current_order = TomlParser.get_order_from_format(self.config.format)
            self.update_vp()
        except Exception as e: QMessageBox.warning(self, "Error", str(e))

    def extract(self, path):
        try:
            p = ColorUtils.extract_from_image(path)
            self.config.directory.style = f"bg:{p['primary']} fg:{p['background']}"
            self.config.git_branch.style = f"bg:{p['secondary']} fg:{p['background']}"
            self.update_vp()
        except Exception as e: QMessageBox.critical(self, "Error", str(e))

    def update_vp(self):
        lines = []
        fmt = self.config.format or ""
        # Brute-force line break support for preview
        fmt_lines = fmt.split("$line_break")
        
        for fl in fmt_lines:
            line_order = TomlParser.get_order_from_format(fl)
            line_segs = []
            for mid in line_order:
                cfg = getattr(self.config, mid, {}) or self.config.modules.get(mid, {})
                s = cfg.get("style", "")
                colors = TomlParser.parse_style(s)
                sym = cfg.get("symbol", mid[:2])
                line_segs.append({"text": f" {sym} segment ", "bg": colors["bg"], "fg": colors["fg"]})
            if line_segs: lines.append(line_segs)
            
        self.vp.segments = lines
        self.vp.update()

    def save(self):
        try:
            p = os.path.expanduser("~/.config/starship.toml")
            if os.path.exists(p): shutil.copy(p, p + ".bak")
            self.config.format = "".join([f"${m}" for m in self.current_order]) + "$line_break$character"
            with open(p, "w") as f: f.write(TomlParser.stringify(self.config))
            self.sb.showMessage("Saved & Backed up!", 5000)
        except Exception as e: QMessageBox.critical(self, "Error", str(e))

if __name__ == "__main__":
    app = QApplication(sys.argv); w = StarshipCommandApp(); w.show(); sys.exit(app.exec())
