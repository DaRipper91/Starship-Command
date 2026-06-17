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
        
        # Professional, clean, readable stylesheet
        self.setStyleSheet("""
            QMainWindow { background-color: #1e1e2e; }
            QWidget { color: #cdd6f4; font-family: 'Inter', 'Segoe UI', sans-serif; font-size: 14px; }
            QSplitter::handle { background-color: #313244; width: 4px; }
            QStatusBar { background-color: #11111b; color: #a6adc8; border-top: 1px solid #313244; padding: 4px; }
            QScrollBar:vertical { background: #1e1e2e; width: 12px; margin: 0px; }
            QScrollBar::handle:vertical { background: #45475a; min-height: 20px; border-radius: 6px; }
        """)
        
        sp = QSplitter(Qt.Orientation.Horizontal)
        self.setCentralWidget(sp)
        
        self.ed = EditorPanel()
        self.ed.pop_mods(self.current_order)
        self.ed.save_req.connect(self.save)
        self.ed.order_ch.connect(self.order_ch)
        self.ed.theme_app.connect(self.apply_theme)
        self.ed.mod_cfg_req.connect(self.show_cfg)
        self.ed.img_ex_req.connect(self.extract)
        sp.addWidget(self.ed)
        
        self.vp = VortexViewport()
        sp.addWidget(self.vp)
        sp.setStretchFactor(0, 1)
        sp.setStretchFactor(1, 2)
        
        self.sb = QStatusBar()
        self.setStatusBar(self.sb)
        self.ind = QLabel(" TENSOR-NATIVE ")
        self.ind.setStyleSheet("background: #89b4fa; color: #11111b; font-weight: bold; padding: 4px 8px; border-radius: 4px; margin-right: 10px;")
        self.sb.addPermanentWidget(self.ind)
        self.sb.showMessage("Engine Ready.", 5000)
        
        self.sync = AuraLink()
        self.sync.start()
        self.update_vp()

    def order_ch(self, o): self.current_order = o; self.update_vp()

    def show_cfg(self, mid):
        cfg = getattr(self.config, mid, {})
        if hasattr(cfg, "model_dump"): cfg = cfg.model_dump()
        if not cfg and isinstance(self.config.modules, dict): cfg = self.config.modules.get(mid, {})
        d = ModuleConfigDialog(mid, cfg, self)
        d.updated.connect(lambda n: self.update_cfg(mid, n))
        d.exec()

    def update_cfg(self, mid, n):
        if hasattr(self.config, mid): setattr(self.config, mid, n)
        else: self.config.modules[mid] = n
        self.update_vp()

    def apply_theme(self, data):
        try:
            self.config, _ = TomlParser.parse(data["config_toml"])
            self.current_order = TomlParser.get_order_from_format(self.config.format)
            self.ed.pop_mods(self.current_order)
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
        fmt_lines = fmt.split("$line_break")
        
        for fl in fmt_lines:
            line_order = TomlParser.get_order_from_format(fl)
            line_segs = []
            for mid in line_order:
                cfg = getattr(self.config, mid, {})
                if hasattr(cfg, "model_dump"): cfg_dict = cfg.model_dump()
                elif isinstance(cfg, dict): cfg_dict = cfg
                else: cfg_dict = self.config.modules.get(mid, {})
                
                s = cfg_dict.get("style", "")
                colors = TomlParser.parse_style(s)
                
                if mid == "character":
                    sym = cfg_dict.get("success_symbol", "❯")
                    line_segs.append({"text": f"{sym} ", "bg": None, "fg": colors["fg"] or "#a6e3a1"})
                else:
                    sym = cfg_dict.get("symbol", "")
                    label = mid.replace("_", " ").title()
                    text = f" {sym} {label} " if sym else f" {label} "
                    line_segs.append({"text": text, "bg": colors["bg"], "fg": colors["fg"]})
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
    app = QApplication(sys.argv)
    w = StarshipCommandApp()
    w.show()
    sys.exit(app.exec())
