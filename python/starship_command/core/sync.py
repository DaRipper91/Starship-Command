import time
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from PySide6.QtCore import QObject, Signal

class StarshipSyncHandler(FileSystemEventHandler):
    def __init__(self, callback):
        self.callback = callback
        self.last_sync = 0

    def on_modified(self, event):
        if event.src_path.endswith("starship.toml"):
            # Debounce rapid saves
            if time.time() - self.last_sync > 0.5:
                self.callback()
                self.last_sync = time.time()

class AuraLink(QObject):
    """
    Aura-Link Live Sync: Monitors starship.toml for external changes.
    """
    file_changed = Signal()

    def __init__(self):
        super().__init__()
        self.observer = Observer()
        self.target_path = os.path.expanduser("~/.config")
        
    def start(self):
        if not os.path.exists(self.target_path):
            return
            
        handler = StarshipSyncHandler(self.file_changed.emit)
        self.observer.schedule(handler, self.target_path, recursive=False)
        self.observer.start()

    def stop(self):
        self.observer.stop()
        self.observer.join()
