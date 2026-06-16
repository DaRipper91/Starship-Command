from PySide6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QScrollArea, QFrame, QLineEdit
)
from PySide6.QtCore import Qt, Signal

class ModuleCard(QFrame):
    clicked = Signal(str)
    
    def __init__(self, module_id: str, name: str, description: str = "", parent=None):
        super().__init__(parent)
        self.module_id = module_id
        self.setFrameShape(QFrame.Shape.StyledPanel)
        self.setStyleSheet("""
            ModuleCard {
                background-color: #313244;
                border-radius: 8px;
                border: 1px solid #45475a;
                margin: 4px;
            }
            ModuleCard:hover {
                border: 1px solid #89b4fa;
            }
        """)
        
        layout = QHBoxLayout(self)
        info_layout = QVBoxLayout()
        name_label = QLabel(name)
        name_label.setStyleSheet("font-weight: bold; color: #89b4fa;")
        info_layout.addWidget(name_label)
        
        if description:
            desc_label = QLabel(description)
            desc_label.setStyleSheet("color: #a6adc8; font-size: 11px;")
            desc_label.setWordWrap(True)
            info_layout.addWidget(desc_label)
        
        layout.addLayout(info_layout)
        
        self.config_btn = QPushButton("⚙")
        self.config_btn.setFixedSize(30, 30)
        self.config_btn.setStyleSheet("""
            QPushButton {
                background-color: #45475a;
                border-radius: 4px;
                color: #cdd6f4;
            }
            QPushButton:hover {
                background-color: #585b70;
            }
        """)
        layout.addWidget(self.config_btn)

class EditorPanel(QWidget):
    save_requested = Signal()
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.layout = QVBoxLayout(self)
        
        # Search Bar
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search modules...")
        self.search_input.setStyleSheet("""
            QLineEdit {
                background-color: #313244;
                border: 1px solid #45475a;
                border-radius: 6px;
                padding: 8px;
                color: #cdd6f4;
            }
            QLineEdit:focus {
                border: 1px solid #89b4fa;
            }
        """)
        self.layout.addWidget(self.search_input)
        
        # Scroll Area
        self.scroll = QScrollArea()
        self.scroll.setWidgetResizable(True)
        self.scroll.setStyleSheet("QScrollArea { border: none; background: transparent; }")
        
        self.container = QWidget()
        self.container_layout = QVBoxLayout(self.container)
        self.container_layout.setAlignment(Qt.AlignmentFlag.AlignTop)
        self.scroll.setWidget(self.container)
        self.layout.addWidget(self.scroll)
        
        # Populate
        self.add_module("directory", "Directory", "Current working directory.")
        self.add_module("git_branch", "Git Branch", "Active git branch.")
        self.add_module("python", "Python", "Python version.")
        
        # Footer Actions
        self.save_btn = QPushButton("💾 SAVE CONFIG")
        self.save_btn.setStyleSheet("""
            QPushButton {
                background-color: #a6e3a1;
                color: #11111b;
                font-weight: bold;
                padding: 10px;
                border-radius: 6px;
                margin-top: 10px;
            }
            QPushButton:hover {
                background-color: #94e2d5;
            }
        """)
        self.save_btn.clicked.connect(lambda: self.save_requested.emit())
        self.layout.addWidget(self.save_btn)

    def add_module(self, mod_id: str, name: str, desc: str):
        card = ModuleCard(mod_id, name, desc)
        self.container_layout.addWidget(card)
