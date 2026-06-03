package core

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight

object PromptParser {
    private val FG_COLORS = mapOf(
        "black" to Color(0xFF000000),
        "red" to Color(0xFFEF4444),
        "green" to Color(0xFF22C3EE),
        "yellow" to Color(0xFFFACC15),
        "blue" to Color(0xFF3B82F6),
        "purple" to Color(0xFFA855F7),
        "magenta" to Color(0xFFD946EF),
        "cyan" to Color(0xFF06B6D4),
        "white" to Color(0xFFFFFFFF)
    )

    fun parse(format: String, config: ThemeConfig, scenario: MockScenario): AnnotatedString {
        var expanded = format.replace("\\n", "\n")
        
        // Expand modules
        val regex = Regex("\\$([a-zA-Z0-9_]+)")
        expanded = regex.replace(expanded) { match ->
            val moduleName = match.groupValues[1]
            renderModule(moduleName, config, scenario)
        }

        return buildAnnotatedString {
            val styledRegex = Regex("\\[(.*?)\\]\\((.*?)\\)")
            var lastIndex = 0
            
            styledRegex.findAll(expanded).forEach { match ->
                if (match.range.first > lastIndex) {
                    append(expanded.substring(lastIndex, match.range.first))
                }
                
                val text = match.groupValues[1]
                val styleStr = match.groupValues[2]
                
                pushStyle(parseStyle(styleStr))
                append(text)
                pop()
                
                lastIndex = match.range.last + 1
            }
            
            if (lastIndex < expanded.length) {
                append(expanded.substring(lastIndex))
            }
        }
    }

    private fun renderModule(name: String, config: ThemeConfig, scenario: MockScenario): String {
        val value = scenario.values[name] ?: ""
        
        return when (name) {
            "character" -> {
                val isError = scenario.name.contains("Error", ignoreCase = true)
                val symbol = if (isError) config.character.error_symbol else config.character.success_symbol
                // Replace the [❯] part with actual scenario value if needed
                symbol.replace(Regex("\\[(.*?)\\]"), "[$value]")
            }
            "directory" -> {
                "[$value](${config.directory.style}) "
            }
            "git_branch" -> {
                "[${config.git_branch.symbol}$value](${config.git_branch.style}) "
            }
            "nodejs" -> {
                if (config.nodejs.enabled && value.isNotEmpty()) "[${config.nodejs.symbol}$value](${config.nodejs.style}) " else ""
            }
            "python" -> {
                if (config.python.enabled && value.isNotEmpty()) "[${config.python.symbol}$value](${config.python.style}) " else ""
            }
            "rust" -> {
                if (config.rust.enabled && value.isNotEmpty()) "[${config.rust.symbol}$value](${config.rust.style}) " else ""
            }
            "aws" -> {
                if (config.aws.enabled && value.isNotEmpty()) "[${config.aws.symbol}$value](${config.aws.style}) " else ""
            }
            "line_break" -> "\n"
            else -> {
                val customConfig = config.custom[name]
                if (customConfig != null && value.isNotEmpty()) {
                    "[${customConfig.symbol}$value](${customConfig.style}) "
                } else if (value.isNotEmpty()) {
                    "[$value](white) "
                } else ""
            }
        }
    }

    private fun parseStyle(style: String): SpanStyle {
        var color = Color.White
        var fontWeight = FontWeight.Normal
        
        style.split(" ").forEach { part ->
            when {
                part == "bold" -> fontWeight = FontWeight.Bold
                part.startsWith("#") -> {
                    color = parseHexColor(part)
                }
                FG_COLORS.containsKey(part) -> color = FG_COLORS[part]!!
            }
        }
        
        return SpanStyle(color = color, fontWeight = fontWeight)
    }

    private fun parseHexColor(hex: String): Color {
        return try {
            val s = hex.removePrefix("#")
            if (s.length == 6) {
                Color(java.lang.Long.parseLong("FF$s", 16))
            } else if (s.length == 3) {
                val r = s[0].toString().repeat(2)
                val g = s[1].toString().repeat(2)
                val b = s[2].toString().repeat(2)
                Color(java.lang.Long.parseLong("FF$r$g$b", 16))
            } else {
                Color.White
            }
        } catch (e: Exception) {
            Color.White
        }
    }
}
