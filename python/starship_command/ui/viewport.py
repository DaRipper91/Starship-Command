from PySide6.QtWidgets import QWidget
from PySide6.QtGui import QPainter, QColor, QFont, QPen, QBrush, QPolygonF
from PySide6.QtCore import Qt, QPointF, QRectF

class VortexViewport(QWidget):
    """
    Aether-style high-fidelity prompt renderer.
    Renders segments with Powerline separators using vector graphics.
    """
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(200)
        
        # Mock segments for prototype
        self.segments = [
            {"text": "  ", "bg": "#fabd2f", "fg": "#282828"},
            {"text": " ~/Projects/Starship-Command ", "bg": "#89b4fa", "fg": "#1e1e2e"},
            {"text": "  main ", "bg": "#cba6f7", "fg": "#1e1e2e"},
        ]
        
        self.bg_color = QColor("#11111b")
        self.font_size = 14
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        
        # Clear background
        painter.fillRect(self.rect(), self.bg_color)
        
        # Rendering starting position
        x_offset = 20
        y_offset = 40
        height = 30
        
        painter.setFont(QFont("FiraCode Nerd Font", self.font_size))
        
        for i, seg in enumerate(self.segments):
            text = seg["text"]
            bg = QColor(seg["bg"])
            fg = QColor(seg["fg"])
            
            # Calculate width based on text
            metrics = painter.fontMetrics()
            text_width = metrics.horizontalAdvance(text)
            segment_width = text_width
            
            # Draw segment background
            rect = QRectF(x_offset, y_offset, segment_width, height)
            painter.fillRect(rect, bg)
            
            # Draw text
            painter.setPen(fg)
            painter.drawText(rect, Qt.AlignmentFlag.AlignCenter, text)
            
            x_offset += segment_width
            
            # Draw Powerline Triangle (Separator)
            next_bg = QColor(self.segments[i+1]["bg"]) if i < len(self.segments) - 1 else self.bg_color
            
            # The triangle "points" right
            triangle_width = 15
            points = [
                QPointF(x_offset, y_offset),
                QPointF(x_offset + triangle_width, y_offset + height / 2),
                QPointF(x_offset, y_offset + height)
            ]
            
            # Fill the triangle with CURRENT segment's color
            # But the background behind it should be NEXT segment's color
            # Actually, standard Powerline: 
            # 1. Fill a square with NEXT_BG
            # 2. Draw a triangle with CUR_BG
            
            # Simplified: just draw the triangle with the current BG color
            painter.setBrush(QBrush(bg))
            painter.setPen(Qt.PenStyle.NoPen)
            painter.drawPolygon(QPolygonF(points))
            
            x_offset += triangle_width

        # Draw the prompt character below
        painter.setPen(QColor("#a6e3a1")) # Success Green
        painter.drawText(20, y_offset + height + 30, "❯ ")

