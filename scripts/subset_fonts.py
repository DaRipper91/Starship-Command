import os
import subprocess
import json
import glob
import re

def get_required_chars():
    chars = set(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? `~"
    )
    
    # 1. Scan nerd-font-symbols.ts
    data_path = 'src/data/nerd-font-symbols.ts'
    if os.path.exists(data_path):
        with open(data_path, 'r', encoding='utf-8') as f:
            content = f.read()
            glyphs = re.findall(r"glyph': '(.*?)'", content)
            for g in glyphs:
                chars.update(g)

    # 2. Scan presets.ts
    preset_path = 'src/lib/presets.ts'
    if os.path.exists(preset_path):
        with open(preset_path, 'r', encoding='utf-8') as f:
            chars.update(f.read())

    return "".join(sorted(list(chars)))

def subset_all_fonts():
    required_text = get_required_chars()
    with open('required_chars.txt', 'w', encoding='utf-8') as f:
        f.write(required_text)

    font_files = glob.glob('public/fonts/*.ttf') + glob.glob('public/fonts/*.otf')
    
    if not font_files:
        print("No source fonts found in public/fonts/. Skipping optimization.")
        return

    for font in font_files:
        output = font.replace('.ttf', '.woff2').replace('.otf', '.woff2')
        print(f"Optimizing {font} -> {output}")
        try:
            # Check if pyftsubset is available
            subprocess.run([
                "pyftsubset", font,
                f"--text-file=required_chars.txt",
                "--layout-features=*",
                "--flavor=woff2",
                f"--output-file={output}"
            ], check=True)
        except FileNotFoundError:
            print("Warning: 'pyftsubset' not found. Install via 'pip install fonttools brotli'")
            break
        except Exception as e:
            print(f"Failed to subset {font}: {e}")

if __name__ == '__main__':
    subset_all_fonts()
