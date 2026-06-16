from datetime import datetime
from typing import Optional, List, Dict, Any, Union
from pydantic import BaseModel, Field

class ThemeMetadata(BaseModel):
    id: str
    name: str
    author: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = []
    created: datetime = Field(default_factory=datetime.now)
    updated: datetime = Field(default_factory=datetime.now)
    preview_image: Optional[str] = None
    font_family: Optional[str] = None
    thumbnail: Optional[str] = None
    is_preset: bool = False

class BaseModuleConfig(BaseModel):
    disabled: bool = False
    format: Optional[str] = None
    style: Optional[str] = None
    symbol: Optional[str] = None

class CharacterConfig(BaseModuleConfig):
    success_symbol: str = "❯"
    error_symbol: str = "✖"
    vimcmd_symbol: str = "❮"

class DirectoryConfig(BaseModuleConfig):
    truncation_length: int = 3
    truncate_to_repo: bool = True
    home_symbol: str = "~"
    read_only: str = "🔒"

class StarshipConfig(BaseModel):
    format: Optional[str] = None
    right_format: Optional[str] = None
    add_newline: bool = True
    palette: Optional[str] = None
    
    # Core Modules
    character: Optional[CharacterConfig] = Field(default_factory=CharacterConfig)
    directory: Optional[DirectoryConfig] = Field(default_factory=DirectoryConfig)
    
    # Generic module storage for the rest
    modules: Dict[str, Union[BaseModuleConfig, Any]] = {}

class Theme(BaseModel):
    metadata: ThemeMetadata
    config: StarshipConfig
