from PySide6.QtWidgets import QWidget
from PySide6.QtGui import QPainter, QColor, QFont, QPen, QBrush, QPolygonF
from PySide6.QtCore import Qt, QPointF, QRectF

class VortexViewport(QWidget):
    """
    Aether-style high-fidelity prompt renderer.
    Renders segments with Powerline separators using vector graphics.
    Supports multi-line formats and right-alignment.
    """
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(300)
        self.segments = [] # List of list of segments (one list per line)
        self.right_segments = []
        self.bg_color = QColor("#11111b")
        self.font_size = 14
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.fillRect(self.rect(), self.bg_color)
        
        if not self.segments:
            return

        painter.setFont(QFont("Monospace", self.font_size))
        y_offset = 40
        height = 34
        line_spacing = 10

        # Render Left/Main Segments
        for line in self.segments:
            x_offset = 20
            for i, seg in enumerate(line):
                x_offset = self._draw_segment(painter, seg, x_offset, y_offset, height, line, i)
            y_offset += height + line_spacing

        # Render Right Segments (on the first line for now)
        if self.right_segments:
            rx_offset = self.width() - 20
            # Draw right segments from right to left
            for seg in reversed(self.right_segments):
                text = seg.get("text", "")
                metrics = painter.fontMetrics()
                tw = metrics.horizontalAdvance(text)
                rx_offset -= (tw + 15)
                self._draw_segment(painter, seg, rx_offset, 40, height, self.right_segments, 0, is_right=True)

    def _draw_segment(self, painter, seg, x, y, h, line, idx, is_right=False):
        text = seg.get("text", "")
        bg_str = seg.get("bg")
        fg_str = seg.get("fg", "#cdd6f4")
        bg = QColor(bg_str) if bg_str else None
        fg = QColor(fg_str)
        
        metrics = painter.fontMetrics()
        tw = metrics.horizontalAdvance(text)
        sw = tw
        tri_w = 16
        
        if bg:
            # Powerline
            next_seg = line[idx+1] if idx < len(line) - 1 else None
            next_bg_str = next_seg.get("bg") if next_seg else None
            next_bg = QColor(next_bg_str) if next_bg_str else self.bg_color
            
            painter.fillRect(QRectF(x + sw, y, tri_w, h), next_bg)
            painter.fillRect(QRectF(x, y, sw, h), bg)
            
            # Triangle
            pts = [QPointF(x+sw, y), QPointF(x+sw+tri_w, y+h/2), QPointF(x+sw, y+h)]
            painter.setBrush(QBrush(bg))
            painter.setPen(Qt.PenStyle.NoPen)
            painter.drawPolygon(QPolygonF(pts))
            
            painter.setPen(fg)
            painter.drawText(QRectF(x, y, sw, h), Qt.AlignmentFlag.AlignCenter, text)
            return x + sw + tri_w
        else:
            # Text Only
            painter.setPen(fg)
            painter.drawText(QRectF(x, y, sw, h), Qt.AlignmentFlag.AlignVCenter, text)
            return x + sw + 10
