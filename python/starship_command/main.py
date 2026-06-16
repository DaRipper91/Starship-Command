import sys
import os
from PySide6.QtWidgets import (
    QApplication, QMainWindow, QVBoxLayout, QWidget, 
    QSplitter, QStatusBar, QLabel, QMessageBox
)
from PySide6.QtCore import Qt
from starship_command.ui.viewport import VortexViewport
from starship_command.ui.editor import EditorPanel
from starship_command.core.parser import TomlParser

class StarshipCommandApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Starship Command // Unified Engine")
        self.setMinimumSize(1200, 800)
        
        # Initial State
        self.config = TomlParser.get_default_config()
        
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

    def handle_save(self):
        try:
            toml_str = TomlParser.stringify(self.config)
            save_path = os.path.expanduser("~/.config/starship.toml")
            
            # For prototype safety, we might want to ask or use a local file
            # But user said "do it", so we'll show a confirm first.
            reply = QMessageBox.question(
                self, "Save Config", 
                f"Overwrite {save_path}?",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
            )
            
            if reply == QMessageBox.StandardButton.Yes:
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                with open(save_path, "w") as f:
                    f.write(toml_str)
                self.status_bar.showMessage(f"Config saved to {save_path}", 5000)
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to save: {str(e)}")

def main():
    app = QApplication(sys.argv)
    window = StarshipCommandApp()
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
