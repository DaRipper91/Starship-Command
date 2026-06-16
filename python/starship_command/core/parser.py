import tomllib
import tomli_w
from typing import Dict, Any, Tuple
from .models import StarshipConfig, ThemeMetadata

class TomlParser:
    @staticmethod
    def parse(toml_string: str) -> Tuple[StarshipConfig, ThemeMetadata]:
        try:
            parsed = tomllib.loads(toml_string)
            
            # Extract metadata if present
            metadata_dict = parsed.get("metadata", {})
            metadata = ThemeMetadata(**metadata_dict) if metadata_dict else ThemeMetadata(
                id="imported-theme",
                name="Imported Theme"
            )
            
            # Remove metadata from the config
            config_dict = {k: v for k, v in parsed.items() if k != "metadata"}
            
            # Separate known core modules from dynamic modules
            core_fields = StarshipConfig.model_fields.keys()
            core_config = {k: v for k, v in config_dict.items() if k in core_fields}
            extra_modules = {k: v for k, v in config_dict.items() if k not in core_fields}
            
            config = StarshipConfig(**core_config)
            config.modules = extra_modules
            
            return config, metadata
        except Exception as e:
            raise ValueError(f"Failed to parse TOML: {str(e)}")

    @staticmethod
    def stringify(config: StarshipConfig, metadata: Optional[ThemeMetadata] = None) -> str:
        try:
            # Prepare config dict
            config_dict = config.model_dump(exclude_none=True)
            
            # Merge modules back to top level
            modules = config_dict.pop("modules", {})
            config_dict.update(modules)
            
            # Add metadata back if provided
            if metadata:
                config_dict["metadata"] = metadata.model_dump(exclude_none=True)
            
            return tomli_w.dumps(config_dict)
        except Exception as e:
            raise ValueError(f"Failed to generate TOML: {str(e)}")

    @staticmethod
    def get_default_config() -> StarshipConfig:
        return StarshipConfig(
            add_newline=True,
            format="$username$hostname$directory$git_branch$git_state$git_status$cmd_duration$line_break$character"
        )
