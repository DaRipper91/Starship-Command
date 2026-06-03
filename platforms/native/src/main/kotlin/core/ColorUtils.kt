package core

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import kotlin.math.abs

object ColorUtils {
    val Presets = mapOf(
        "Nord" to mapOf(
            "primary" to "#88C0D0",
            "background" to "#2E3440",
            "foreground" to "#D8DEE9"
        ),
        "Dracula" to mapOf(
            "primary" to "#BD93F9",
            "background" to "#282A36",
            "foreground" to "#F8F8F2"
        ),
        "TokyoNight" to mapOf(
            "primary" to "#7aa2f7",
            "background" to "#1a1b26",
            "foreground" to "#c0caf5"
        ),
        "Catppuccin" to mapOf(
            "primary" to "#cba6f7",
            "background" to "#1e1e2e",
            "foreground" to "#cdd6f4"
        )
    )

    fun generatePaletteFromPrompt(prompt: String): Map<String, String> {
        var hash = 0
        for (char in prompt) {
            hash = char.code + ((hash shl 5) - hash)
        }
        
        val hue = abs(hash % 360).toFloat()
        // Simple HSL to RGB conversion simplified for this context
        // We'll just return a few colors based on hue
        return mapOf(
            "primary" to hueToHex(hue),
            "background" to hueToHex(hue, 0.2f, 0.1f),
            "foreground" to hueToHex(hue, 0.1f, 0.9f)
        )
    }

    private fun hueToHex(h: Float, s: Float = 0.7f, l: Float = 0.6f): String {
        // Very basic HSL to Hex
        val color = Color.hsl(h, s, l)
        return String.format("#%06X", 0xFFFFFF and color.toArgb())
    }
    
    fun Color.toHex(): String {
        return String.format("#%06X", 0xFFFFFF and this.toArgb())
    }
}
