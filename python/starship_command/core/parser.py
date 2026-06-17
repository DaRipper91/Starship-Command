import tomllib
import tomli_w
import re
from typing import Dict, Any, Tuple, Optional, List
from .models import StarshipConfig, ThemeMetadata

class TomlParser:
    @staticmethod
    def parse_style(style_str: str, palette: Dict[str, str] = None) -> Dict[str, str]:
        result = {"bg": None, "fg": None, "bold": False}
        if not style_str:
            return result
        bg_match = re.search(r'bg:(#[0-9a-fA-F]{6}|[0-9a-fA-F]{3})', style_str)
        if bg_match: result["bg"] = bg_match.group(1)
        fg_match = re.search(r'fg:(#[0-9a-fA-F]{6}|[0-9a-fA-F]{3})', style_str)
        if fg_match: result["fg"] = fg_match.group(1)
        if palette:
            for name, hex_code in palette.items():
                if f"bg:{name}" in style_str: result["bg"] = hex_code
                if f"fg:{name}" in style_str or (name in style_str and not result["fg"]): result["fg"] = hex_code
        if not result["fg"]:
            hex_matches = re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}', style_str)
            if hex_matches:
                result["fg"] = hex_matches[0]
                if not result["bg"] and len(hex_matches) > 1: result["bg"] = hex_matches[1]
        if "bold" in style_str: result["bold"] = True
        return result

    @staticmethod
    def get_order_from_format(format_str: str) -> List[str]:
        if not format_str: return []
        pattern = r'(?<!\\)\$([a-zA-Z0-9_]+)'
        matches = re.findall(pattern, format_str)
        # We only exclude line_break now. character is a visual module.
        exclude = ["line_break"]
        return [m for m in matches if m not in exclude]

    @staticmethod
    def parse(toml_string: str) -> Tuple[StarshipConfig, ThemeMetadata]:
        try:
            parsed = tomllib.loads(toml_string)
            metadata_dict = parsed.get("metadata", {})
            metadata = ThemeMetadata(**metadata_dict) if metadata_dict else ThemeMetadata(id="local", name="Local Config")
            config_dict = {k: v for k, v in parsed.items() if k != "metadata"}
            core_fields = StarshipConfig.model_fields.keys()
            core_config = {k: v for k, v in config_dict.items() if k in core_fields}
            extra_modules = {k: v for k, v in config_dict.items() if k not in core_fields}
            config = StarshipConfig(**core_config)
            config.modules = extra_modules
            return config, metadata
        except Exception as e: raise ValueError(f"Failed to parse TOML: {str(e)}")

    @staticmethod
    def stringify(config: StarshipConfig, metadata: Optional[ThemeMetadata] = None) -> str:
        try:
            config_dict = config.model_dump(exclude_none=True)
            modules = config_dict.pop("modules", {})
            config_dict.update(modules)
            if metadata: config_dict["metadata"] = metadata.model_dump(exclude_none=True)
            return tomli_w.dumps(config_dict)
        except Exception as e: raise ValueError(f"Failed to generate TOML: {str(e)}")

    @staticmethod
    def get_default_config() -> StarshipConfig:
        return StarshipConfig(
            add_newline=True,
            format="$os$directory$git_branch$git_status$line_break$character"
        )
