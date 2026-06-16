import sys
import os
import traceback

# Redirect stderr to a log file for debugging
log_path = os.path.expanduser("~/starship_command_error.log")
sys.stderr = open(log_path, "w")

try:
    from PySide6.QtWidgets import (
        QApplication, QMainWindow, QVBoxLayout, QWidget, 
        QSplitter, QStatusBar, QLabel, QMessageBox
    )
    from PySide6.QtCore import Qt
    from starship_command.ui.viewport import VortexViewport
    from starship_command.ui.editor import EditorPanel
    from starship_command.core.parser import TomlParser
    from starship_command.core.sync import AuraLink
    from starship_command.core.colors import ColorUtils

    class StarshipCommandApp(QMainWindow):
        def __init__(self):
            super().__init__()
            self.setWindowTitle("Starship Command // Unified Engine")
            self.setMinimumSize(1200, 800)
            
            # Initial State
            self.config = TomlParser.get_default_config()
            self.current_order = ["directory", "git_branch", "python"]
            self.current_palette = ColorUtils.presets["Catppuccin"]
            
            # Dark Theme Styling
            self.setStyleSheet("""
                QMainWindow { background-color: #1e1e2e; }
                QWidget { color: #cdd6f4; }
                QSplitter::handle { background-color: #45475a; }
                QStatusBar { background-color: #181825; color: #a6adc8; border-top: 1px solid #45475a; }
            """)
            
            splitter = QSplitter(Qt.Orientation.Horizontal)
            self.setCentralWidget(splitter)
            
            self.editor_panel = EditorPanel()
            self.editor_panel.save_requested.connect(self.handle_save)
            self.editor_panel.order_changed.connect(self.handle_order_change)
            self.editor_panel.preset_requested.connect(self.handle_preset_change)
            splitter.addWidget(self.editor_panel)
            
            self.viewport = VortexViewport()
            splitter.addWidget(self.viewport)
            
            splitter.setStretchFactor(0, 1)
            splitter.setStretchFactor(1, 2)
            
            self.status_bar = QStatusBar()
            self.setStatusBar(self.status_bar)
            self.status_bar.showMessage("Engine Status: Sovereign Interchange Active")
            
            self.indicator = QLabel(" TENSOR-NATIVE ")
            self.indicator.setStyleSheet("background-color: #f38ba8; color: #11111b; font-weight: bold; border-radius: 4px; margin-right: 10px;")
            self.status_bar.addPermanentWidget(self.indicator)
            
            self.aura_link = AuraLink()
            self.aura_link.file_changed.connect(self.handle_external_change)
            self.aura_link.start()
            
            self.update_preview()

        def handle_order_change(self, new_order):
            self.current_order = new_order
            self.update_preview()

        def handle_preset_change(self, preset_id):
            name_map = {"catppuccin": "Catppuccin", "nord": "Nord", "gruvbox": "Gruvbox"}
            key = name_map.get(preset_id, "Catppuccin")
            if key in ColorUtils.presets:
                self.current_palette = ColorUtils.presets[key]
                self.status_bar.showMessage(f"Preset applied: {key}", 3000)
                self.update_preview()

        def handle_external_change(self):
            self.status_bar.showMessage("External Change Detected!", 3000)

        def update_preview(self):
            p = self.current_palette
            segment_map = {
                "directory": {"text": " ~/Projects/Starship-Command ", "bg": p["primary"], "fg": p["background"]},
                "git_branch": {"text": "  main ", "bg": p["accent"], "fg": p["background"]},
                "python": {"text": "  3.14.0 ", "bg": p["secondary"], "fg": p["background"]},
            }
            new_segments = []
            new_segments.append({"text": "  ", "bg": p.get("error", "#f38ba8"), "fg": p["background"]})
            for mod_id in self.current_order:
                if mod_id in segment_map:
                    new_segments.append(segment_map[mod_id])
            self.viewport.segments = new_segments
            self.viewport.update()

        def handle_save(self):
            try:
                format_str = "".join([f"${m}" for m in self.current_order]) + "$line_break$character"
                self.config.format = format_str
                toml_str = TomlParser.stringify(self.config)
                save_path = os.path.expanduser("~/.config/starship.toml")
                with open(save_path, "w") as f:
                    f.write(toml_str)
                self.status_bar.showMessage(f"Config saved to {save_path}", 5000)
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save: {str(e)}")

        def closeEvent(self, event):
            self.aura_link.stop()
            super().closeEvent(event)

    def main():
        app = QApplication(sys.argv)
        window = StarshipCommandApp()
        window.show()
        sys.exit(app.exec())

    if __name__ == "__main__":
        main()

except Exception:
    traceback.print_exc(file=sys.stderr)
