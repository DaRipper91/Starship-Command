from typing import Dict, Any

class BasePlugin:
    def __init__(self, name: str):
        self.name = name

    def decorate(self, segment: Dict[str, Any]) -> Dict[str, Any]:
        """Override this to modify a segment before rendering."""
        return segment

class TensorOptimizationPlugin(BasePlugin):
    def decorate(self, segment: Dict[str, Any]) -> Dict[str, Any]:
        # Example: Add a special glow or indicator to segments on Tensor hardware
        if segment.get("id") == "character":
            segment["text"] = "⚡ " + segment["text"]
        return segment
