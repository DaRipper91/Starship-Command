from PySide6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QScrollArea, QFrame, QLineEdit,
    QListWidget, QListWidgetItem, QAbstractItemView,
    QTabWidget
)
from PySide6.QtCore import Qt, Signal, QSize

class ModuleCard(QFrame):
    def __init__(self, module_id: str, name: str, description: str = "", parent=None):
        super().__init__(parent)
        self.module_id = module_id
        self.setFrameShape(QFrame.Shape.StyledPanel)
        self.setStyleSheet("""
            ModuleCard {
                background-color: #313244;
                border-radius: 8px;
                border: 1px solid #45475a;
            }
            ModuleCard:hover {
                border: 1px solid #89b4fa;
            }
        """)
        
        layout = QHBoxLayout(self)
        layout.setContentsMargins(10, 10, 10, 10)
        self.handle = QLabel("⋮⋮")
        self.handle.setStyleSheet("color: #585b70; font-weight: bold; margin-right: 5px;")
        layout.addWidget(self.handle)
        
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
            QPushButton { background-color: #45475a; border-radius: 4px; color: #cdd6f4; }
            QPushButton:hover { background-color: #585b70; }
        """)
        layout.addWidget(self.config_btn)

class ModuleList(QListWidget):
    order_changed = Signal(list)
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setDragDropMode(QAbstractItemView.DragDropMode.InternalMove)
        self.setDefaultDropAction(Qt.DropAction.MoveAction)
        self.setSpacing(5)
        self.setStyleSheet("QListWidget { background: transparent; border: none; }")
        self.model().rowsMoved.connect(self._on_rows_moved)

    def _on_rows_moved(self, *args):
        new_order = []
        for i in range(self.count()):
            item = self.item(i)
            widget = self.itemWidget(item)
            if widget: new_order.append(widget.module_id)
        self.order_changed.emit(new_order)

class PresetCard(QFrame):
    applied = Signal(str)
    def __init__(self, preset_id: str, name: str, colors: list, parent=None):
        super().__init__(parent)
        self.preset_id = preset_id
        self.setStyleSheet(f"background-color: #313244; border-radius: 8px; border: 1px solid #45475a;")
        layout = QVBoxLayout(self)
        
        label = QLabel(name)
        label.setStyleSheet("font-weight: bold; color: #cdd6f4;")
        layout.addWidget(label)
        
        # Color preview strip
        color_layout = QHBoxLayout()
        for c in colors:
            swatch = QWidget()
            swatch.setFixedSize(20, 10)
            swatch.setStyleSheet(f"background-color: {c}; border-radius: 2px;")
            color_layout.addWidget(swatch)
        layout.addLayout(color_layout)
        
        self.apply_btn = QPushButton("APPLY")
        self.apply_btn.setStyleSheet("background-color: #89b4fa; color: #1e1e2e; font-weight: bold; border-radius: 4px;")
        self.apply_btn.clicked.connect(lambda: self.applied.emit(self.preset_id))
        layout.addWidget(self.apply_btn)

class EditorPanel(QWidget):
    save_requested = Signal()
    order_changed = Signal(list)
    preset_requested = Signal(str)
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.layout = QVBoxLayout(self)
        
        self.tabs = QTabWidget()
        self.tabs.setStyleSheet("""
            QTabWidget::pane { border: 1px solid #45475a; top: -1px; background: #1e1e2e; }
            QTabBar::tab { background: #181825; color: #a6adc8; padding: 10px; border: 1px solid #45475a; }
            QTabBar::tab:selected { background: #1e1e2e; color: #89b4fa; border-bottom: 2px solid #89b4fa; }
        """)
        self.layout.addWidget(self.tabs)
        
        # TAB 1: Modules
        self.module_tab = QWidget()
        mod_layout = QVBoxLayout(self.module_tab)
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search modules...")
        mod_layout.addWidget(self.search_input)
        
        self.module_list = ModuleList()
        self.module_list.order_changed.connect(self.order_changed.emit)
        mod_layout.addWidget(self.module_list)
        self.tabs.addTab(self.module_tab, "MODULES")
        
        # TAB 2: Presets (Beacon Engine)
        self.preset_tab = QWidget()
        pre_layout = QVBoxLayout(self.preset_tab)
        self.scroll_pre = QScrollArea()
        self.scroll_pre.setWidgetResizable(True)
        self.pre_container = QWidget()
        self.pre_grid = QVBoxLayout(self.pre_container)
        self.scroll_pre.setWidget(self.pre_container)
        pre_layout.addWidget(self.scroll_pre)
        self.tabs.addTab(self.preset_tab, "PRESETS")
        
        # Populate Presets
        self.add_preset("Catppuccin", ["#cba6f7", "#89b4fa", "#f5c2e7"])
        self.add_preset("Nord", ["#88C0D0", "#81A1C1", "#5E81AC"])
        self.add_preset("Gruvbox", ["#d79921", "#458588", "#b16286"])

        # Initial Modules
        self.add_module("directory", "Directory", "Work dir.")
        self.add_module("git_branch", "Git Branch", "Branch.")
        self.add_module("python", "Python", "Runtime.")
        
        # Footer
        self.save_btn = QPushButton("💾 SAVE CONFIG")
        self.save_btn.setStyleSheet("background-color: #a6e3a1; color: #11111b; font-weight: bold; padding: 10px; border-radius: 6px;")
        self.save_btn.clicked.connect(self.save_requested.emit)
        self.layout.addWidget(self.save_btn)

    def add_module(self, mod_id: str, name: str, desc: str):
        item = QListWidgetItem(self.module_list)
        item.setSizeHint(QSize(0, 65))
        self.module_list.addItem(item)
        self.module_list.setItemWidget(item, ModuleCard(mod_id, name, desc))

    def add_preset(self, name: str, colors: list):
        card = PresetCard(name.lower(), name, colors)
        card.applied.connect(self.preset_requested.emit)
        self.pre_grid.addWidget(card)
