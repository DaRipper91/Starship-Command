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
        self.segments = []
        self.bg_color = QColor("#11111b")
        self.font_size = 14
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        
        # Clear background
        painter.fillRect(self.rect(), self.bg_color)
        
        if not self.segments:
            return

        # Rendering starting position
        x_offset = 20
        y_offset = 40
        height = 34
        triangle_width = 16
        
        painter.setFont(QFont("Monospace", self.font_size))
        
        for i, seg in enumerate(self.segments):
            text = seg["text"]
            bg = QColor(seg["bg"])
            fg = QColor(seg["fg"])
            
            # Calculate width based on text
            metrics = painter.fontMetrics()
            text_width = metrics.horizontalAdvance(text)
            segment_width = text_width
            
            # 1. Peek at next segment color to draw the triangle background
            next_bg = QColor(self.segments[i+1]["bg"]) if i < len(self.segments) - 1 else self.bg_color
            
            # Draw triangle background (the "rest" of the square)
            bg_rect = QRectF(x_offset + segment_width, y_offset, triangle_width, height)
            painter.fillRect(bg_rect, next_bg)
            
            # 2. Draw segment main background
            rect = QRectF(x_offset, y_offset, segment_width, height)
            painter.fillRect(rect, bg)
            
            # 3. Draw text
            painter.setPen(fg)
            painter.drawText(rect, Qt.AlignmentFlag.AlignCenter, text)
            
            # 4. Draw Powerline Triangle (Foreground)
            points = [
                QPointF(x_offset + segment_width, y_offset),
                QPointF(x_offset + segment_width + triangle_width, y_offset + height / 2),
                QPointF(x_offset + segment_width, y_offset + height)
            ]
            painter.setBrush(QBrush(bg))
            painter.setPen(Qt.PenStyle.NoPen)
            painter.drawPolygon(QPolygonF(points))
            
            x_offset += segment_width + triangle_width

        # Draw the prompt character below
        painter.setPen(QColor("#a6e3a1")) # Success Green
        painter.drawText(20, y_offset + height + 40, "❯ ")
