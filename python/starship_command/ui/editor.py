from PySide6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
    QPushButton, QScrollArea, QFrame, QLineEdit,
    QListWidget, QListWidgetItem, QAbstractItemView,
    QTabWidget, QFileDialog
)
from PySide6.QtCore import Qt, Signal, QSize
from starship_command.core.database import DatabaseManager

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

class StoreThemeCard(QFrame):
    applied = Signal(dict)
    def __init__(self, theme_data: dict, parent=None):
        super().__init__(parent)
        self.theme_data = theme_data
        self.setStyleSheet("background-color: #313244; border-radius: 10px; border: 1px solid #45475a; margin-bottom: 5px;")
        
        layout = QVBoxLayout(self)
        
        header = QHBoxLayout()
        name_label = QLabel(theme_data["name"].upper())
        name_label.setStyleSheet("font-weight: bold; color: #89b4fa; font-size: 14px; border: none;")
        header.addWidget(name_label)
        
        stars = QLabel(f"★ {theme_data['stars']}")
        stars.setStyleSheet("color: #f9e2af; border: none;")
        header.addWidget(stars, 0, Qt.AlignmentFlag.AlignRight)
        layout.addLayout(header)
        
        desc = QLabel(theme_data["description"])
        desc.setStyleSheet("color: #a6adc8; font-size: 11px; border: none;")
        desc.setWordWrap(True)
        layout.addWidget(desc)
        
        meta = QLabel(f"Author: {theme_data['author']} | {theme_data['category']}")
        meta.setStyleSheet("color: #585b70; font-size: 10px; border: none; font-style: italic;")
        layout.addWidget(meta)
        
        self.apply_btn = QPushButton("INSTALL / APPLY")
        self.apply_btn.setStyleSheet("""
            QPushButton {
                background-color: #45475a;
                color: #cdd6f4;
                font-weight: bold;
                padding: 8px;
                border-radius: 4px;
                margin-top: 5px;
            }
            QPushButton:hover { background-color: #89b4fa; color: #1e1e2e; }
        """)
        self.apply_btn.clicked.connect(lambda: self.applied.emit(self.theme_data))
        layout.addWidget(self.apply_btn)

class EditorPanel(QWidget):
    save_requested = Signal()
    order_changed = Signal(list)
    theme_applied = Signal(dict)
    image_extraction_requested = Signal(str)
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.db = DatabaseManager()
        self.layout = QVBoxLayout(self)
        
        self.tabs = QTabWidget()
        self.tabs.setStyleSheet("""
            QTabWidget::pane { border: 1px solid #45475a; top: -1px; background: #1e1e2e; }
            QTabBar::tab { background: #181825; color: #a6adc8; padding: 12px; border: 1px solid #45475a; }
            QTabBar::tab:selected { background: #1e1e2e; color: #89b4fa; border-bottom: 2px solid #89b4fa; }
        """)
        self.layout.addWidget(self.tabs)
        
        # TAB 1: MODULES
        self.module_tab = QWidget()
        mod_layout = QVBoxLayout(self.module_tab)
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search modules...")
        mod_layout.addWidget(self.search_input)
        
        self.module_list = ModuleList()
        self.module_list.order_changed.connect(self.order_changed.emit)
        mod_layout.addWidget(self.module_list)
        self.tabs.addTab(self.module_tab, "INTERCHANGE")
        
        # TAB 2: SOVEREIGN STORE
        self.store_tab = QWidget()
        store_layout = QVBoxLayout(self.store_tab)
        
        # Chameleon Action
        self.chameleon_btn = QPushButton("🦎 CHAMELEON ENGINE")
        self.chameleon_btn.setStyleSheet("""
            QPushButton {
                background-color: #fabd2f;
                color: #11111b;
                font-weight: bold;
                padding: 10px;
                border-radius: 8px;
            }
            QPushButton:hover { background-color: #fe8019; }
        """)
        self.chameleon_btn.clicked.connect(self.handle_chameleon)
        store_layout.addWidget(self.chameleon_btn)

        self.store_search = QLineEdit()
        self.store_search.setPlaceholderText("Search Sovereign Store...")
        self.store_search.setStyleSheet("background-color: #181825; border: 1px solid #45475a; padding: 8px; border-radius: 4px;")
        store_layout.addWidget(self.store_search)

        self.scroll_store = QScrollArea()
        self.scroll_store.setWidgetResizable(True)
        self.scroll_store.setStyleSheet("QScrollArea { border: none; background: transparent; }")
        self.store_container = QWidget()
        self.store_grid = QVBoxLayout(self.store_container)
        self.store_grid.setAlignment(Qt.AlignmentFlag.AlignTop)
        self.scroll_store.setWidget(self.store_container)
        store_layout.addWidget(self.scroll_store)
        self.tabs.addTab(self.store_tab, "SOVEREIGN STORE")
        
        # Initial Loads
        self.populate_modules()
        self.refresh_store()
        
        # Footer
        self.save_btn = QPushButton("💾 SAVE CONFIG")
        self.save_btn.setStyleSheet("background-color: #a6e3a1; color: #11111b; font-weight: bold; padding: 10px; border-radius: 6px;")
        self.save_btn.clicked.connect(self.save_requested.emit)
        self.layout.addWidget(self.save_btn)

    def populate_modules(self):
        mods = [
            ("directory", "Directory", "Work dir."),
            ("git_branch", "Git Branch", "Branch."),
            ("python", "Python", "Runtime."),
            ("nodejs", "Node.js", "JS Runtime."),
            ("cmd_duration", "Duration", "Execution time.")
        ]
        for m_id, name, desc in mods:
            item = QListWidgetItem(self.module_list)
            item.setSizeHint(QSize(0, 65))
            self.module_list.addItem(item)
            self.module_list.setItemWidget(item, ModuleCard(m_id, name, desc))

    def refresh_store(self):
        # Clear existing
        for i in reversed(range(self.store_grid.count())): 
            self.store_grid.itemAt(i).widget().setParent(None)
            
        themes = self.db.get_all_themes()
        for theme in themes:
            card = StoreThemeCard(theme)
            card.applied.connect(self.theme_applied.emit)
            self.store_grid.addWidget(card)

    def handle_chameleon(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Chameleon: Extract from Wallpaper",
            "", "Images (*.png *.jpg *.jpeg *.webp *.bmp)"
        )
        if file_path:
            self.image_extraction_requested.emit(file_path)
