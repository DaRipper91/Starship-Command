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
        self._last_saved_toml = ""
        self.scenarios = {"git": True, "python": False, "node": False, "rust": False, "docker": False, "duration": False, "error": False}
        self.load_config()
        
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
        self.ed.scenarios_ch.connect(self.scenarios_ch)
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
        self.sync.file_changed.connect(self.reload_config)
        self.sync.wallpaper_changed.connect(self.on_wallpaper_changed)
        self.sync.start()
        self.update_vp()

    def order_ch(self, o): self.current_order = o; self.update_vp()

    def scenarios_ch(self, sc):
        self.scenarios = sc
        self.update_vp()

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

    def load_config(self):
        p = os.path.expanduser("~/.config/starship.toml")
        if os.path.exists(p):
            try:
                with open(p, "r") as f:
                    toml_string = f.read()
                self.config, _ = TomlParser.parse(toml_string)
                self.current_order = TomlParser.get_order_from_format(self.config.format)
                self._last_saved_toml = toml_string
            except Exception as e:
                self.config = TomlParser.get_default_config()
                self.current_order = TomlParser.get_order_from_format(self.config.format)
                self._last_saved_toml = ""
        else:
            self.config = TomlParser.get_default_config()
            self.current_order = TomlParser.get_order_from_format(self.config.format)
            self._last_saved_toml = ""

    def reload_config(self):
        p = os.path.expanduser("~/.config/starship.toml")
        if os.path.exists(p):
            try:
                with open(p, "r") as f:
                    toml_string = f.read()
                if self._last_saved_toml == toml_string:
                    return
                self.config, _ = TomlParser.parse(toml_string)
                self.current_order = TomlParser.get_order_from_format(self.config.format)
                self._last_saved_toml = toml_string
                self.ed.pop_mods(self.current_order)
                self.update_vp()
                self.sb.showMessage("Configuration reloaded from disk.", 3000)
            except Exception as e:
                 self.sb.showMessage(f"Reload failed: {str(e)}", 5000)

    def on_wallpaper_changed(self):
        p = os.path.expanduser("~/.config/plasma-org.kde.plasma.desktop-appletsrc")
        if os.path.exists(p):
            try:
                img_path = None
                with open(p, "r") as f:
                    for line in f:
                        if line.strip().startswith("Image="):
                            val = line.strip().split("Image=")[1]
                            if val.startswith("file://"):
                                val = val[7:]
                            img_path = val
                            break
                if img_path and os.path.exists(img_path):
                    self.extract(img_path)
                    self.sb.showMessage(f"Wallpaper color sync applied: {os.path.basename(img_path)}", 3000)
            except Exception as e:
                self.sb.showMessage(f"Wallpaper sync error: {str(e)}", 5000)

    def closeEvent(self, event):
        self.sync.stop()
        super().closeEvent(event)

    def extract(self, path):
        try:
            p = ColorUtils.extract_from_image(path)
            self.config.directory.style = f"bg:{p['primary']} fg:{p['background']}"
            self.config.git_branch.style = f"bg:{p['secondary']} fg:{p['background']}"
            self.update_vp()
        except Exception as e: QMessageBox.critical(self, "Error", str(e))

    def _get_segments_for_config(self, config):
        lines = []
        fmt = config.format or ""
        fmt_lines = fmt.split("$line_break")
        
        for fl in fmt_lines:
            line_order = TomlParser.get_order_from_format(fl)
            line_segs = []
            for mid in line_order:
                # Scenario filter check!
                if mid != "character" and hasattr(self, "scenarios"):
                    if mid in ["git_branch", "git_status"] and not self.scenarios.get("git", True): continue
                    if mid == "python" and not self.scenarios.get("python", False): continue
                    if mid == "nodejs" and not self.scenarios.get("node", False): continue
                    if mid == "rust" and not self.scenarios.get("rust", False): continue
                    if mid == "docker_context" and not self.scenarios.get("docker", False): continue
                    if mid == "cmd_duration" and not self.scenarios.get("duration", False): continue
                    if mid == "status" and not self.scenarios.get("error", False): continue

                cfg = getattr(config, mid, {})
                if hasattr(cfg, "model_dump"): cfg_dict = cfg.model_dump()
                elif isinstance(cfg, dict): cfg_dict = cfg
                else: cfg_dict = config.modules.get(mid, {})
                
                s = cfg_dict.get("style", "")
                colors = TomlParser.parse_style(s)
                
                if mid == "character":
                    # Scenario exit code character check!
                    if hasattr(self, "scenarios") and self.scenarios.get("error", False):
                        sym = cfg_dict.get("error_symbol", "✖")
                        fg_color = colors["fg"] or "#f38ba8" # standard error red
                    else:
                        sym = cfg_dict.get("success_symbol", "❯")
                        fg_color = colors["fg"] or "#a6e3a1" # success green
                    line_segs.append({"text": f"{sym} ", "bg": None, "fg": fg_color})
                else:
                    sym = cfg_dict.get("symbol", "")
                    label = mid.replace("_", " ").title()
                    text = f" {sym} {label} " if sym else f" {label} "
                    line_segs.append({"text": text, "bg": colors["bg"], "fg": colors["fg"]})
            if line_segs: lines.append(line_segs)
        return lines

    def update_vp(self):
        self.vp.segments = self._get_segments_for_config(self.config)
        
        # Parallel View Comparison
        if getattr(self, "_last_saved_toml", ""):
            try:
                active_cfg, _ = TomlParser.parse(self._last_saved_toml)
                self.vp.active_segments = self._get_segments_for_config(active_cfg)
            except Exception:
                self.vp.active_segments = []
        else:
            self.vp.active_segments = []
            
        self.vp.update()

    def save(self):
        try:
            p = os.path.expanduser("~/.config/starship.toml")
            if os.path.exists(p): shutil.copy(p, p + ".bak")
            
            if "character" in self.current_order:
                idx = self.current_order.index("character")
                before = self.current_order[:idx]
                after = self.current_order[idx+1:]
                fmt_before = "".join([f"${m}" for m in before])
                fmt_after = "".join([f"${m}" for m in after])
                self.config.format = fmt_before + "$line_break$character" + fmt_after
            else:
                self.config.format = "".join([f"${m}" for m in self.current_order]) + "$line_break$character"
                
            toml_string = TomlParser.stringify(self.config)
            self._last_saved_toml = toml_string
            with open(p, "w") as f: f.write(toml_string)
            self.sb.showMessage("Saved & Backed up!", 5000)
        except Exception as e: QMessageBox.critical(self, "Error", str(e))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    w = StarshipCommandApp()
    w.show()
    sys.exit(app.exec())
