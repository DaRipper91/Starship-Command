from PySide6.QtWidgets import QWidget
from PySide6.QtGui import QPainter, QColor, QFont, QPen, QBrush, QPolygonF
from PySide6.QtCore import Qt, QPointF, QRectF

class VortexViewport(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(350)
        self.segments = []
        self.bg_color = QColor("#11111b") # Deep readable terminal background
        self.font_size = 15
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.fillRect(self.rect(), self.bg_color)
        
        if not self.segments:
            return

        # Use standard monospace terminal font
        painter.setFont(QFont("Monospace", self.font_size))
        y_offset = 60
        height = 36
        line_spacing = 15

        for line in self.segments:
            x_offset = 30
            for i, seg in enumerate(line):
                x_offset = self._draw_segment(painter, seg, x_offset, y_offset, height, line, i)
            y_offset += height + line_spacing

    def _draw_segment(self, painter, seg, x, y, h, line, idx):
        text = seg.get("text", "")
        bg_str = seg.get("bg")
        fg_str = seg.get("fg", "#cdd6f4") # Standard readable white
        
        bg = QColor(bg_str) if bg_str else None
        fg = QColor(fg_str)
        
        metrics = painter.fontMetrics()
        tw = metrics.horizontalAdvance(text)
        sw = tw
        tri_w = 16
        
        if bg:
            next_seg = line[idx+1] if idx < len(line) - 1 else None
            next_bg_str = next_seg.get("bg") if next_seg else None
            next_bg = QColor(next_bg_str) if next_bg_str else self.bg_color
            
            painter.fillRect(QRectF(x + sw, y, tri_w, h), next_bg)
            painter.fillRect(QRectF(x, y, sw, h), bg)
            
            pts = [QPointF(x+sw, y), QPointF(x+sw+tri_w, y+h/2), QPointF(x+sw, y+h)]
            painter.setBrush(QBrush(bg))
            painter.setPen(Qt.PenStyle.NoPen)
            painter.drawPolygon(QPolygonF(pts))
            
            painter.setPen(fg)
            painter.drawText(QRectF(x, y, sw, h), Qt.AlignmentFlag.AlignCenter, text)
            return x + sw + tri_w
        else:
            painter.setPen(fg)
            painter.drawText(QRectF(x, y, sw, h), Qt.AlignmentFlag.AlignVCenter, text)
            return x + sw + 15
