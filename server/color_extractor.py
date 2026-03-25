#!/usr/bin/env python3
import os
import sys
import tempfile
import argparse
import requests
import shutil
import socket
import ipaddress
from urllib.parse import urlparse
from colorthief import ColorThief

# Use the relative import if it's being run as a module, or just import normally
try:
    from server.utils import safe_download
except ImportError:
    # If not in the same package, we might need to adjust the path or copy the function
    def is_safe_ip(ip_str):
        try:
            ip = ipaddress.ip_address(ip_str)
            return ip.is_global and not (
                ip.is_loopback or
                ip.is_link_local or
                ip.is_multicast or
                ip.is_private
            )
        except ValueError:
            return False

    def safe_download(url, dest_path, timeout=10, chunk_size=8192):
        parsed = urlparse(url)
        if parsed.scheme not in ('http', 'https'):
            raise ValueError(f"Unsupported scheme: {parsed.scheme}")

        hostname = parsed.hostname
        if not hostname:
            raise ValueError("No hostname in URL")

        # Resolve hostname to all possible IP addresses
        try:
            addr_info = socket.getaddrinfo(hostname, parsed.port or (80 if parsed.scheme == 'http' else 443))
        except socket.gaierror as e:
            raise ValueError(f"Could not resolve hostname {hostname}: {e}")

        # Check if any of the resolved IPs are unsafe
        for family, _, _, _, sockaddr in addr_info:
            ip = sockaddr[0]
            if not is_safe_ip(ip):
                raise ValueError(f"URL resolves to an unsafe IP address: {ip}")

        headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

        response = requests.get(url, timeout=timeout, stream=True, headers=headers)
        response.raise_for_status()

        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=chunk_size):
                f.write(chunk)

        return dest_path

class ColorExtractor:
    def __init__(self, input_source, output_dir=None, palette_path=None):
        self.input_source = input_source
        self.output_dir = os.path.expanduser(output_dir or "~/ops/color-tools/output")
        self.palette_path = os.path.expanduser(palette_path or "~/Colors/vibrant_palette.md")
        self.temp_dir = tempfile.mkdtemp()
        self.image_path = None
        self.palette = []

    def prepare_image(self):
        if self.input_source.startswith(('http://', 'https://')):
            img_path = os.path.join(self.temp_dir, "downloaded_image")
            try:
                safe_download(self.input_source, img_path)
                self.image_path = img_path
            except ValueError as e:
                raise ValueError(f"URL {self.input_source} is not allowed for security reasons: {e}")
            except Exception as e:
                raise ValueError(f"Error downloading image from {self.input_source}: {e}")
        else:
            self.image_path = os.path.abspath(self.input_source)

    def extract_colors(self):
        color_thief = ColorThief(self.image_path)
        # Extract 16 colors for a full terminal palette
        self.palette = color_thief.get_palette(color_count=16, quality=1)

    def get_hex_0x(self, rgb):
        return f"0x{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
    
    def get_hex(self, rgb):
        return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

    def get_rgb_str(self, rgb):
        return f"{rgb[0]},{rgb[1]},{rgb[2]}"
    
    def get_palette_dict(self):
        if not self.palette or len(self.palette) < 16:
            return {}
        
        bg = self.palette[0]
        fg = self.palette[-1]
        colors_16 = self.palette[:16]

        palette_dict = {
            "bg": self.get_hex(bg),
            "fg": self.get_hex(fg)
        }
        for i, c in enumerate(colors_16):
            palette_dict[f'color{i}'] = self.get_hex(c)
        
        return {"extracted": palette_dict}


    def generate_configs(self):
        if not self.palette:
            return

        bg = self.palette[0]
        fg = self.palette[-1]
        colors_16 = self.palette[:16]

        if len(colors_16) < 16:
            # Fallback if too few colors
            colors_16 = (colors_16 * 2)[:16]

        os.makedirs(self.output_dir, exist_ok=True)

        # 1. Alacritty
        alacritty_path = os.path.join(self.output_dir, "alacritty_theme.toml")
        with open(alacritty_path, 'w') as f:
            f.write("[colors.primary]\n")
            f.write(f'background = "{self.get_hex_0x(bg)}"\n')
            f.write(f'foreground = "{self.get_hex_0x(fg)}"\n')
            f.write("\n[colors.normal]\n")
            for i, c in enumerate(colors_16[:8]):
                names = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"]
                f.write(f'{names[i]} = "{self.get_hex_0x(c)}"\n')
            f.write("\n[colors.bright]\n")
            for i, c in enumerate(colors_16[8:]):
                names = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"]
                f.write(f'{names[i]} = "{self.get_hex_0x(c)}"\n')
        print(f"Generated Alacritty theme: {alacritty_path}")

        # 2. Konsole
        konsole_path = os.path.join(self.output_dir, "extracted.colorscheme")
        with open(konsole_path, 'w') as f:
            f.write("[Background]\n")
            f.write(f"Color={self.get_rgb_str(bg)}\n")
            f.write("[Foreground]\n")
            f.write(f"Color={self.get_rgb_str(fg)}\n")
            # Simplified Konsole color map
            for i, c in enumerate(colors_16[:8]):
                f.write(f"[Color{i}]\nColor={self.get_rgb_str(c)}\n")
        print(f"Generated Konsole colorscheme: {konsole_path}")

        # 3. Starship
        starship_path = os.path.join(self.output_dir, "starship_palette.toml")
        with open(starship_path, 'w') as f:
            f.write("[palettes.extracted]\n")
            f.write(f'bg = "#{bg[0]:02x}{bg[1]:02x}{bg[2]:02x}"\n')
            f.write(f'fg = "#{fg[0]:02x}{fg[1]:02x}{fg[2]:02x}"\n')
            for i, c in enumerate(colors_16):
                f.write(f'color{i} = "#{c[0]:02x}{c[1]:02x}{c[2]:02x}"\n')
        print(f"Generated Starship palette: {starship_path}")

        print("\n--- Usage Tips ---")
        print(f"Alacritty: Add 'import = [\"{alacritty_path}\"]' to your alacritty.toml")
        print(f"Konsole: Copy 'extracted.colorscheme' (from {self.output_dir}) to ~/.local/share/konsole/")
        print(f"Starship: Add 'palette = \"extracted\"' and import '{starship_path}' to your starship.toml")

    def update_vibrant_palette(self):
        if os.path.exists(self.palette_path):
            with open(self.palette_path, 'a') as f:
                f.write(f"\n## Extracted from {os.path.basename(self.input_source)}\n")
                f.write(f"- **Background**: `#{self.palette[0][0]:02x}{self.palette[0][1]:02x}{self.palette[0][2]:02x}`\n")
                f.write(f"- **Foreground**: `#{self.palette[-1][0]:02x}{self.palette[-1][1]:02x}{self.palette[-1][2]:02x}`\n")
                for i, c in enumerate(self.palette[1:9]): # Just show a few
                    f.write(f"- **Color {i}**: `#{c[0]:02x}{c[1]:02x}{c[2]:02x}`\n")
            print(f"Updated {self.palette_path}")

    def cleanup(self):
        shutil.rmtree(self.temp_dir)

def main():
    parser = argparse.ArgumentParser(description="Extract terminal color schemes from an image or URL.")
    parser.add_argument("input", help="Path to local image or URL")
    parser.add_argument("--output-dir", "-o",
                        default="~/ops/color-tools/output",
                        help="Directory to save generated configs (default: %(default)s)")
    parser.add_argument("--palette-file", "-p",
                        default="~/Colors/vibrant_palette.md",
                        help="Path to vibrant_palette.md (default: %(default)s)")
    parser.add_argument("--no-update", action="store_true",
                        help="Don't update the vibrant palette file")

    args = parser.parse_args()
    
    extractor = ColorExtractor(args.input, output_dir=args.output_dir, palette_path=args.palette_file)
    try:
        extractor.prepare_image()
        extractor.extract_colors()
        extractor.generate_configs()
        if not args.no_update:
            extractor.update_vibrant_palette()
    finally:
        extractor.cleanup()

if __name__ == "__main__":
    main()
