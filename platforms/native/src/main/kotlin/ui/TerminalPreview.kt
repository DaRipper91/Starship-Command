package ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Terminal
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import core.MockScenarios
import core.PromptParser
import core.ThemeDocument
import java.io.File
import NerdFontFamily

@Composable
fun SmartTerminalPreview(themeDoc: ThemeDocument) {
    var selectedScenario by remember { mutableStateOf(MockScenarios.Clean) }
    var showRealOutput by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize()) {
        // Toolbar for switching scenarios
        Row(
            modifier = Modifier.fillMaxWidth().background(Color.DarkGray).padding(4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Default.Terminal, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(16.dp).padding(start = 4.dp))
            Spacer(Modifier.width(8.dp))
            
            MockScenarios.List.forEach { scenario ->
                val isSelected = selectedScenario == scenario
                Text(
                    text = scenario.name,
                    color = if (isSelected) Color.White else Color.Gray,
                    modifier = Modifier
                        .padding(horizontal = 8.dp)
                        .clickable { selectedScenario = scenario },
                    style = MaterialTheme.typography.caption
                )
            }
            
            Spacer(Modifier.weight(1f))
            
            IconButton(onClick = { showRealOutput = !showRealOutput }, modifier = Modifier.size(24.dp)) {
                Icon(Icons.Default.BugReport, contentDescription = "Toggle Real Output", tint = if (showRealOutput) Color.Green else Color.Gray, modifier = Modifier.size(16.dp))
            }
        }

        Box(modifier = Modifier.weight(1f).fillMaxWidth().padding(16.dp)) {
            if (showRealOutput) {
                RealTerminalPreview(themeDoc)
            } else {
                val annotatedString = PromptParser.parse(themeDoc.config.format, themeDoc.config, selectedScenario)
                Column {
                    Row {
                        Text("user", color = Color(0xFF4ADE80), fontFamily = NerdFontFamily)
                        Text("@terminal", color = Color(0xFF60A5FA), fontFamily = NerdFontFamily)
                        Text(":", color = Color.White, fontFamily = NerdFontFamily)
                    }
                    Text(
                        text = annotatedString,
                        fontFamily = NerdFontFamily,
                        style = MaterialTheme.typography.body1
                    )
                }
            }
        }
    }
}

@Composable
fun RealTerminalPreview(themeDoc: ThemeDocument) {
    var promptOutput by remember { mutableStateOf(buildAnnotatedString { append("Loading preview...") }) }

    LaunchedEffect(themeDoc) {
        val tempFile = File.createTempFile("starship_preview", ".toml")
        try {
            val sb = StringBuilder()
            val c = themeDoc.config
            sb.append("format = \"\"\"${c.format}\"\"\"\n")
            sb.append("add_newline = false\n")
            sb.append("[character]\nsuccess_symbol = \"${c.character.success_symbol}\"\nerror_symbol = \"${c.character.error_symbol}\"\n")
            sb.append("[directory]\nstyle = \"${c.directory.style}\"\ntruncation_length = ${c.directory.truncation_length}\n")
            sb.append("[git_branch]\nsymbol = \"${c.git_branch.symbol}\"\nstyle = \"${c.git_branch.style}\"\n")
            sb.append("[nodejs]\nenabled = ${c.nodejs.enabled}\nsymbol = \"${c.nodejs.symbol}\"\nstyle = \"${c.nodejs.style}\"\n")
            sb.append("[python]\nenabled = ${c.python.enabled}\nsymbol = \"${c.python.symbol}\"\nstyle = \"${c.python.style}\"\n")
            
            tempFile.writeText(sb.toString())

            val process = ProcessBuilder("starship", "prompt", "--config", tempFile.absolutePath)
                .directory(File(System.getProperty("user.home")))
                .start()
            
            val output = process.inputStream.bufferedReader().readText()
            promptOutput = parseAnsi(output)
        } catch (e: Exception) {
            promptOutput = buildAnnotatedString { append("Error: ${e.message}") }
        } finally {
            tempFile.delete()
        }
    }

    Text(
        text = promptOutput,
        fontFamily = NerdFontFamily,
        style = MaterialTheme.typography.body1
    )
}

fun parseAnsi(input: String): AnnotatedString {
    return buildAnnotatedString {
        var i = 0
        while (i < input.length) {
            if (input[i] == '\u001B' && i + 1 < input.length && input[i + 1] == '[') {
                val end = input.indexOf('m', i)
                if (end != -1) {
                    val code = input.substring(i + 2, end)
                    val style = when (code) {
                        "31" -> SpanStyle(color = Color.Red)
                        "32" -> SpanStyle(color = Color.Green)
                        "33" -> SpanStyle(color = Color.Yellow)
                        "34" -> SpanStyle(color = Color.Blue)
                        "35" -> SpanStyle(color = Color.Magenta)
                        "36" -> SpanStyle(color = Color.Cyan)
                        "37" -> SpanStyle(color = Color.White)
                        "1" -> SpanStyle(fontWeight = FontWeight.Bold)
                        else -> SpanStyle()
                    }
                    i = end + 1
                    continue
                }
            }
            append(input[i])
            i++
        }
    }
}
