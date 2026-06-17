import sys
import os
import traceback
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
        
        # State
        self.config = TomlParser.get_default_config()
        self.current_order = ["directory", "git_branch", "python"]
        self.current_palette = ColorUtils.presets["Catppuccin"]
        
        # UI Setup
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
        self.editor_panel.theme_applied.connect(self.handle_store_theme)
        self.editor_panel.image_extraction_requested.connect(self.handle_image_extraction)
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

    def handle_store_theme(self, theme_data):
        self.status_bar.showMessage(f"Applying '{theme_data['name']}' from Store...", 3000)
        # In a real implementation, we would parse the theme_data["config_toml"]
        # For the prototype, we'll notify and update the order if it's detectable
        toml_str = theme_data["config_toml"]
        if "format =" in toml_str:
            # Quick hack to detect order from format string
            parts = [p.replace("$", "") for p in toml_str.split("$") if p.strip() and p[0].isalpha()]
            if parts:
                self.current_order = [p for p in parts if p in ["directory", "git_branch", "python", "nodejs", "cmd_duration"]]
        
        self.update_preview()

    def handle_image_extraction(self, image_path):
        self.status_bar.showMessage(f"Chameleon Engine: Extracting from {os.path.basename(image_path)}...", 0)
        try:
            new_palette = ColorUtils.extract_from_image(image_path)
            self.current_palette = new_palette
            self.status_bar.showMessage("Chameleon Engine: Palette Extracted!", 5000)
            self.update_preview()
        except Exception as e:
            QMessageBox.critical(self, "Extraction Error", f"Failed: {str(e)}")

    def handle_external_change(self):
        self.status_bar.showMessage("External Change Detected!", 3000)

    def update_preview(self):
        p = self.current_palette
        bg = p.get("background", "#1e1e2e")
        primary = p.get("primary", "#89b4fa")
        secondary = p.get("secondary", "#cba6f7")
        accent = p.get("accent", "#f5c2e7")

        segment_map = {
            "directory": {"text": " ~/Projects/Starship-Command ", "bg": primary, "fg": bg},
            "git_branch": {"text": "  main ", "bg": secondary, "fg": bg},
            "python": {"text": "  3.14.0 ", "bg": accent, "fg": bg},
            "nodejs": {"text": "  22.0.0 ", "bg": "#a6e3a1", "fg": bg},
            "cmd_duration": {"text": " 󱎫 2s ", "bg": "#f9e2af", "fg": bg}
        }
        
        new_segments = []
        new_segments.append({"text": "  ", "bg": p.get("error", "#f38ba8"), "fg": bg})
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
            QMessageBox.critical(self, "Error", f"Failed: {str(e)}")

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
