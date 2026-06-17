from PySide6.QtWidgets import QWidget
from PySide6.QtGui import QPainter, QColor, QFont, QPen, QBrush, QPolygonF
from PySide6.QtCore import Qt, QPointF, QRectF

class VortexViewport(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(450)
        self.segments = []         # Current draft segments
        self.active_segments = []  # Active/saved config segments
        self.bg_color = QColor("#11111b") # Deep readable terminal background
        self.font_size = 15
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.fillRect(self.rect(), self.bg_color)
        
        # 1. Draw Active config block
        painter.setPen(QColor("#a6adc8"))
        painter.setFont(QFont("Inter", 10, QFont.Weight.Bold))
        painter.drawText(30, 30, "ACTIVE CONFIGURATION (DISK)")
        
        painter.setFont(QFont("Monospace", self.font_size))
        y_offset = 55
        height = 36
        line_spacing = 15
        
        if self.active_segments:
            for line in self.active_segments:
                x_offset = 30
                for i, seg in enumerate(line):
                    x_offset = self._draw_segment(painter, seg, x_offset, y_offset, height, line, i)
                y_offset += height + line_spacing
        else:
            painter.setPen(QColor("#585b70"))
            painter.drawText(30, y_offset + 20, "(No configuration on disk / Loading...)")
            y_offset += height + line_spacing
            
        # Draw a separator line
        y_offset += 15
        painter.setPen(QPen(QColor("#313244"), 1, Qt.PenStyle.DashLine))
        painter.drawLine(20, y_offset, self.width() - 20, y_offset)
        y_offset += 25
        
        # 2. Draw Draft config block
        painter.setPen(QColor("#89b4fa"))
        painter.setFont(QFont("Inter", 10, QFont.Weight.Bold))
        painter.drawText(30, y_offset, "DRAFT CONFIGURATION (UNSAVED)")
        
        painter.setFont(QFont("Monospace", self.font_size))
        y_offset += 25
        
        if self.segments:
            for line in self.segments:
                x_offset = 30
                for i, seg in enumerate(line):
                    x_offset = self._draw_segment(painter, seg, x_offset, y_offset, height, line, i)
                y_offset += height + line_spacing
        else:
            painter.setPen(QColor("#585b70"))
            painter.drawText(30, y_offset + 20, "(No draft configuration)")

    def _draw_segment(self, painter, seg, x, y, h, line, idx):
        text = seg.get("text", "")
        bg_str = seg.get("bg")
        fg_str = seg.get("fg") or "#cdd6f4"
        
        bg = QColor(bg_str) if bg_str else None
        fg = QColor(fg_str)
        
        # Calculate relative luminance
        fg_lum = (0.299 * fg.red() + 0.587 * fg.green() + 0.114 * fg.blue()) / 255.0
        
        metrics = painter.fontMetrics()
        tw = metrics.horizontalAdvance(text)
        sw = tw
        tri_w = 16
        
        if bg:
            bg_lum = (0.299 * bg.red() + 0.587 * bg.green() + 0.114 * bg.blue()) / 255.0
            # If contrast difference is too low, adjust background to contrast with fg
            if abs(bg_lum - fg_lum) < 0.35:
                if fg_lum < 0.4:
                    bg = QColor("#ffffff") # Dark text -> White background
                else:
                    bg = QColor("#11111b") # Light text -> Dark background
            
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
            # Check contrast against terminal background
            bg_lum = (0.299 * self.bg_color.red() + 0.587 * self.bg_color.green() + 0.114 * self.bg_color.blue()) / 255.0
            if abs(bg_lum - fg_lum) < 0.35:
                # Text color is too dark for the terminal background!
                # Draw a nice clean light rounded pill-shaped background
                bg_contrast = QColor("#ffffff")
                painter.setBrush(QBrush(bg_contrast))
                painter.setPen(QPen(QColor("#e0e0e0"), 1))
                painter.drawRoundedRect(QRectF(x, y, sw + 10, h), 4, 4)
                
                painter.setPen(fg)
                painter.drawText(QRectF(x + 5, y, sw, h), Qt.AlignmentFlag.AlignVCenter, text)
                return x + sw + 25
            else:
                painter.setPen(fg)
                painter.drawText(QRectF(x, y, sw, h), Qt.AlignmentFlag.AlignVCenter, text)
                return x + sw + 15
