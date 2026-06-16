from typing import Dict, List, Optional, Tuple
import colorsys

class ColorUtils:
    @staticmethod
    def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
        hex_color = hex_color.lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    @staticmethod
    def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
        return '#{:02x}{:02x}{:02x}'.format(*rgb)

    @staticmethod
    def get_relative_luminance(hex_color: str) -> float:
        r, g, b = [x / 255.0 for x in ColorUtils.hex_to_rgb(hex_color)]
        r = r / 12.92 if r <= 0.03928 else ((r + 0.055) / 1.055) ** 2.4
        g = g / 12.92 if g <= 0.03928 else ((g + 0.055) / 1.055) ** 2.4
        b = b / 12.92 if b <= 0.03928 else ((b + 0.055) / 1.055) ** 2.4
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    @staticmethod
    def get_contrast_ratio(color1: str, color2: str) -> float:
        l1 = ColorUtils.get_relative_luminance(color1)
        l2 = ColorUtils.get_relative_luminance(color2)
        lighter = max(l1, l2)
        darker = min(l1, l2)
        return (lighter + 0.05) / (darker + 0.05)

    @staticmethod
    def check_contrast(foreground: str, background: str) -> Dict[str, Any]:
        ratio = ColorUtils.get_contrast_ratio(foreground, background)
        return {
            "ratio": ratio,
            "AA": ratio >= 4.5,
            "AAA": ratio >= 7.0
        }

    @staticmethod
    def to_ansi_style(color: str, **options) -> str:
        parts = []
        if options.get("bold"): parts.append("bold")
        if options.get("italic"): parts.append("italic")
        if options.get("dimmed"): parts.append("dimmed")
        if options.get("inverted"): parts.append("inverted")
        if options.get("underline"): parts.append("underline")
        
        bg = options.get("bg")
        if bg:
            parts.append(f"bg:{bg}")
            
        if color:
            parts.append(color)
            
        return " ".join(parts)

    presets = {
        "Catppuccin": {
            "primary": "#cba6f7",
            "secondary": "#89b4fa",
            "accent": "#f5c2e7",
            "background": "#1e1e2e",
            "foreground": "#cdd6f4",
            "success": "#a6e3a1",
            "warning": "#f9e2af",
            "error": "#f38ba8",
        },
        "Nord": {
            "primary": "#88C0D0",
            "secondary": "#81A1C1",
            "accent": "#5E81AC",
            "background": "#2E3440",
            "foreground": "#D8DEE9",
            "success": "#A3BE8C",
            "warning": "#EBCB8B",
            "error": "#BF616A",
        }
    }
