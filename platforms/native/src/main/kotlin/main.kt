import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.platform.Font
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import kotlinx.coroutines.launch
import core.*
import data.ThemeRepository
import ui.*

val DarkBackground = Color(0xFF0F172A)
val SurfaceColor = Color(0xFF1E293B)
val PrimaryColor = Color(0xFF7E57C2)
val TextColor = Color(0xFFF8FAFC)
val TextMuted = Color(0xFF94A3B8)

val NerdFontFamily = FontFamily(
    Font(resource = "fonts/nerd-font.ttf", weight = FontWeight.Normal)
)

@Composable
fun App() {
    val repository = remember { ThemeRepository() }
    var themeDoc by remember { mutableStateOf(repository.load()) }
    var selectedModule by remember { mutableStateOf("General") }
    var activeTab by remember { mutableStateOf("Architect") }
    var showAsciiSurprise by remember { mutableStateOf(false) }
    val scaffoldState = rememberScaffoldState()
    val scope = rememberCoroutineScope()

    if (showAsciiSurprise) {
        Box(Modifier.fillMaxSize().clickable { showAsciiSurprise = false }) {
            AsciiBanner()
        }
        return
    }

    MaterialTheme(
        colors = darkColors(
            primary = PrimaryColor,
            background = DarkBackground,
            surface = SurfaceColor,
            onPrimary = Color.White,
            onBackground = TextColor,
            onSurface = TextColor
        )
    ) {
        Scaffold(
            scaffoldState = scaffoldState,
            topBar = {
                TopAppBar(
                    title = { Text("Star Command Desktop", modifier = Modifier.testTag("title")) },
                    actions = {
                        IconButton(onClick = { themeDoc = repository.load() }) {
                            Icon(Icons.Default.Refresh, "Reload")
                        }
                        Button(
                            onClick = { repository.save(themeDoc) },
                            modifier = Modifier.padding(end = 8.dp)
                        ) {
                            Icon(Icons.Default.Save, contentDescription = null)
                            Spacer(Modifier.width(8.dp))
                            Text("Save")
                        }
                    },
                    backgroundColor = SurfaceColor,
                    contentColor = TextColor,
                    elevation = 0.dp
                )
            }
        ) { padding ->
            Row(modifier = Modifier.fillMaxSize().padding(padding).background(DarkBackground)) {
                // Left Sidebar
                Column(modifier = Modifier.width(220.dp).fillMaxHeight().padding(16.dp)) {
                    Text("NAVIGATION", style = MaterialTheme.typography.caption, color = TextMuted)
                    Spacer(Modifier.height(8.dp))
                    
                    SidebarTabItem("Architect", Icons.Default.Architecture, activeTab == "Architect") { activeTab = "Architect" }
                    SidebarTabItem("Wizard", Icons.Default.AutoAwesome, activeTab == "Wizard") { activeTab = "Wizard" }
                    SidebarTabItem("Editor", Icons.Default.Edit, activeTab == "Editor") { activeTab = "Editor" }
                    SidebarTabItem("Gallery", Icons.Default.Public, activeTab == "Gallery") { activeTab = "Gallery" }
                    SidebarTabItem("Icons", Icons.Default.EmojiEmotions, activeTab == "Icons") { activeTab = "Icons" }
                    SidebarTabItem("Palette", Icons.Default.Palette, activeTab == "Palette") { activeTab = "Palette" }

                    if (activeTab == "Editor") {
                        Spacer(Modifier.height(24.dp))
                        Text("MODULES", style = MaterialTheme.typography.caption, color = TextMuted)
                        Spacer(Modifier.height(8.dp))
                        val modules = listOf("General", "Directory", "Git Branch", "Node.js", "Rust", "Python", "AWS", "Custom")
                        modules.forEach { module ->
                            SidebarItem(module, selectedModule == module) { selectedModule = module }
                        }
                    }

                    Spacer(Modifier.weight(1f))
                    Text("PRESETS", style = MaterialTheme.typography.caption, color = TextMuted)
                    Spacer(Modifier.height(8.dp))
                    Presets.List.forEach { (name, config) ->
                        Text(
                            name,
                            modifier = Modifier.fillMaxWidth().clickable { themeDoc = themeDoc.copy(config = config) }.padding(8.dp),
                            style = MaterialTheme.typography.body2,
                            color = TextColor
                        )
                    }
                }

                Box(Modifier.width(1.dp).fillMaxHeight().background(SurfaceColor))

                // Center Content
                Column(modifier = Modifier.weight(1f).fillMaxHeight()) {
                    when (activeTab) {
                        "Architect" -> VisualPromptBuilder(themeDoc) { themeDoc = it }
                        "Wizard" -> PromptWizard(themeDoc.config) { themeDoc = themeDoc.copy(config = it) }
                        "Editor" -> EditorContent(selectedModule, themeDoc) { themeDoc = it }
                        "Gallery" -> CommunityGallery { themeDoc = themeDoc.copy(config = it) }
                        "Icons" -> IconBrowser { symbol ->
                            scope.launch {
                                scaffoldState.snackbarHostState.showSnackbar("Icon $symbol copied to clipboard!")
                            }
                        }
                        "Palette" -> PaletteGenerator { showAsciiSurprise = true }
                    }
                }

                Box(Modifier.width(1.dp).fillMaxHeight().background(SurfaceColor))

                // Right Sidebar: Preview
                Column(modifier = Modifier.width(400.dp).fillMaxHeight().padding(24.dp)) {
                    Text("LIVE PREVIEW", style = MaterialTheme.typography.caption, color = TextMuted)
                    Spacer(Modifier.height(16.dp))
                    
                    Card(
                        backgroundColor = Color.Black,
                        modifier = Modifier.fillMaxWidth().height(250.dp),
                        elevation = 8.dp,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        SmartTerminalPreview(themeDoc)
                    }
                    
                    Spacer(Modifier.height(24.dp))
                    Text("TIPS", style = MaterialTheme.typography.caption, color = TextMuted)
                    Spacer(Modifier.height(8.dp))
                    Text("• Use the 'Icons' tab to find glyphs.\n• Switch scenarios in the preview to see how your prompt reacts to different states.\n• The smart preview parses your style in real-time.",
                        style = MaterialTheme.typography.caption, color = TextMuted)
                }
            }
        }
    }
}

@Composable
fun SidebarTabItem(name: String, icon: androidx.compose.ui.graphics.vector.ImageVector, isSelected: Boolean, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(if (isSelected) PrimaryColor.copy(alpha = 0.2f) else Color.Transparent)
            .clickable(onClick = onClick)
            .padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = if (isSelected) PrimaryColor else TextColor, modifier = Modifier.size(20.dp))
        Spacer(Modifier.width(12.dp))
        Text(name, color = if (isSelected) PrimaryColor else TextColor, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal)
    }
}

@Composable
fun SidebarItem(name: String, isSelected: Boolean, onClick: () -> Unit) {
    Text(
        name,
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(vertical = 6.dp, horizontal = 12.dp),
        color = if (isSelected) PrimaryColor else TextMuted,
        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
        style = MaterialTheme.typography.body2
    )
}

@Composable
fun EditorContent(selectedModule: String, themeDoc: ThemeDocument, onUpdate: (ThemeDocument) -> Unit) {
    Column(modifier = Modifier.fillMaxSize().padding(24.dp).verticalScroll(rememberScrollState())) {
        Text(selectedModule, style = MaterialTheme.typography.h5)
        Spacer(Modifier.height(24.dp))

        when (selectedModule) {
            "General" -> {
                PromptLayoutEditor(themeDoc.config.format) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(format = it)))
                }
                Spacer(Modifier.height(24.dp))
                EditorField("Raw Format String", themeDoc.config.format) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(format = it)))
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(themeDoc.config.add_newline, onCheckedChange = {
                        onUpdate(themeDoc.copy(config = themeDoc.config.copy(add_newline = it)))
                    })
                    Text("Add Newline")
                }
            }
            "Directory" -> {
                StyleEditor(themeDoc.config.directory.style) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(directory = themeDoc.config.directory.copy(style = it))))
                }
                EditorField("Truncation Length", themeDoc.config.directory.truncation_length.toString()) {
                    it.toIntOrNull()?.let { len ->
                        onUpdate(themeDoc.copy(config = themeDoc.config.copy(directory = themeDoc.config.directory.copy(truncation_length = len))))
                    }
                }
            }
            "Git Branch" -> {
                EditorField("Symbol", themeDoc.config.git_branch.symbol) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(git_branch = themeDoc.config.git_branch.copy(symbol = it))))
                }
                StyleEditor(themeDoc.config.git_branch.style) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(git_branch = themeDoc.config.git_branch.copy(style = it))))
                }
            }
            "Node.js" -> {
                GenericModuleEditor(themeDoc.config.nodejs) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(nodejs = it)))
                }
            }
            "Rust" -> {
                GenericModuleEditor(themeDoc.config.rust) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(rust = it)))
                }
            }
            "Python" -> {
                GenericModuleEditor(themeDoc.config.python) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(python = it)))
                }
            }
            "AWS" -> {
                GenericModuleEditor(themeDoc.config.aws) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(aws = it)))
                }
            }
            "Custom" -> {
                CustomModulesEditor(themeDoc.config.custom) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(custom = it)))
                }
            }
            "Character" -> {
                EditorField("Success Symbol", themeDoc.config.character.success_symbol) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(character = themeDoc.config.character.copy(success_symbol = it))))
                }
                EditorField("Error Symbol", themeDoc.config.character.error_symbol) {
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(character = themeDoc.config.character.copy(error_symbol = it))))
                }
            }
        }
    }
}

@Composable
fun PaletteGenerator(onSurprise: () -> Unit = {}) {
    var prompt by remember { mutableStateOf("") }
    var palette by remember { mutableStateOf<Map<String, String>?>(null) }

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Text("AI Palette Generator", style = MaterialTheme.typography.h5)
        Text("Enter a mood or theme to generate a color palette.", style = MaterialTheme.typography.caption, color = TextMuted)
        
        Spacer(Modifier.height(16.dp))
        
        TextField(
            value = prompt,
            onValueChange = { 
                prompt = it
                if (it.uppercase() == "ASCII") onSurprise()
            },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("e.g. Cyberpunk, Forest, Sunset") }
        )
        
        Spacer(Modifier.height(16.dp))
        
        Button(onClick = { palette = ColorUtils.generatePaletteFromPrompt(prompt) }) {
            Text("Generate Palette")
        }
        
        if (palette != null) {
            Spacer(Modifier.height(24.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                palette!!.forEach { (key, hex) ->
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        val color = try {
                             Color(java.lang.Long.parseLong("FF" + hex.removePrefix("#"), 16))
                        } catch (e: Exception) { Color.Gray }
                        
                        Box(Modifier.size(60.dp).clip(RoundedCornerShape(8.dp)).background(color))
                        Text(key, style = MaterialTheme.typography.caption)
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun PromptLayoutEditor(format: String, onFormatChange: (String) -> Unit) {
    Column {
        Text("Prompt Layout", style = MaterialTheme.typography.subtitle2, color = TextMuted)
        Spacer(Modifier.height(8.dp))
        val chips = format.split("$").filter { it.isNotEmpty() }.map { "$" + it }
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            chips.forEach { chip ->
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = PrimaryColor.copy(alpha = 0.2f),
                    contentColor = PrimaryColor
                ) {
                    Text(chip, modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp), style = MaterialTheme.typography.body2, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class, ExperimentalMaterialApi::class)
@Composable
fun StyleEditor(currentStyle: String, onStyleChange: (String) -> Unit) {
    val colors = listOf("red", "green", "yellow", "blue", "magenta", "cyan", "white", "black")
    val attributes = listOf("bold", "italic", "underline")
    var showColorWheel by remember { mutableStateOf(false) }

    if (showColorWheel) {
        AlertDialog(
            onDismissRequest = { showColorWheel = false },
            title = { Text("Color Picker") },
            text = {
                Box(Modifier.width(450.dp), contentAlignment = Alignment.Center) {
                    RGBSliderPicker(initialColor = PrimaryColor) { color ->
                        val hex = core.ColorUtils.run { color.toHex() }
                        val hexRegex = Regex("#[A-Fa-f0-9]{6}")
                        val newStyle = if (hexRegex.containsMatchIn(currentStyle)) {
                            currentStyle.replace(hexRegex, hex)
                        } else {
                            "$currentStyle $hex".trim()
                        }
                        onStyleChange(newStyle)
                    }
                }
            },
            confirmButton = {
                Button(onClick = { showColorWheel = false }) { Text("Done") }
            },
            backgroundColor = SurfaceColor,
            contentColor = TextColor
        )
    }

    Column(Modifier.fillMaxWidth().padding(vertical = 16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Style Editor", style = MaterialTheme.typography.subtitle2, color = TextMuted, modifier = Modifier.weight(1f))
            IconButton(onClick = { showColorWheel = true }) {
                Icon(Icons.Default.Palette, "Color Wheel", tint = PrimaryColor)
            }
        }
        Spacer(Modifier.height(12.dp))
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            colors.forEach { color ->
                val isSelected = currentStyle.contains(color)
                FilterChip(selected = isSelected, onClick = {
                    val newStyle = if (isSelected) currentStyle.replace(color, "").trim() else "$currentStyle $color".trim()
                    onStyleChange(newStyle)
                }) { Text(color) }
            }
        }
        Spacer(Modifier.height(8.dp))
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            attributes.forEach { attr ->
                val isSelected = currentStyle.contains(attr)
                FilterChip(selected = isSelected, onClick = {
                    val newStyle = if (isSelected) currentStyle.replace(attr, "").trim() else "$currentStyle $attr".trim()
                    onStyleChange(newStyle)
                }) { Text(attr) }
            }
        }
    }
}

@Composable
fun ModuleToggle(enabled: Boolean, onToggle: (Boolean) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(bottom = 16.dp)) {
        Switch(enabled, onCheckedChange = onToggle, colors = SwitchDefaults.colors(checkedThumbColor = PrimaryColor))
        Spacer(Modifier.width(8.dp))
        Text(if (enabled) "Module Enabled" else "Module Disabled")
    }
}

@Composable
fun GenericModuleEditor(config: ModuleConfig, onUpdate: (ModuleConfig) -> Unit) {
    ModuleToggle(config.enabled, onToggle = { onUpdate(config.copy(enabled = it)) })
    EditorField("Symbol", config.symbol) { onUpdate(config.copy(symbol = it)) }
    StyleEditor(config.style) { onUpdate(config.copy(style = it)) }
}

@Composable
fun CustomModulesEditor(custom: Map<String, CustomModuleConfig>, onUpdate: (Map<String, CustomModuleConfig>) -> Unit) {
    Column {
        custom.forEach { (name, config) ->
            Card(
                backgroundColor = SurfaceColor,
                modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp),
                shape = RoundedCornerShape(8.dp),
                elevation = 2.dp
            ) {
                Column(Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(name, style = MaterialTheme.typography.h6, color = PrimaryColor, modifier = Modifier.weight(1f))
                        IconButton(onClick = {
                            val newMap = custom.toMutableMap()
                            newMap.remove(name)
                            onUpdate(newMap)
                        }) {
                            Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color.Red.copy(alpha = 0.7f))
                        }
                    }
                    Spacer(Modifier.height(8.dp))
                    EditorField("Command", config.command) {
                        val newMap = custom.toMutableMap()
                        newMap[name] = config.copy(command = it)
                        onUpdate(newMap)
                    }
                    EditorField("Symbol", config.symbol) {
                        val newMap = custom.toMutableMap()
                        newMap[name] = config.copy(symbol = it)
                        onUpdate(newMap)
                    }
                    StyleEditor(config.style) {
                        val newMap = custom.toMutableMap()
                        newMap[name] = config.copy(style = it)
                        onUpdate(newMap)
                    }
                }
            }
        }
        
        Button(
            onClick = {
                val newMap = custom.toMutableMap()
                val newName = "custom_module_${custom.size + 1}"
                newMap[newName] = CustomModuleConfig(command = "echo hello")
                onUpdate(newMap)
            },
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(backgroundColor = PrimaryColor.copy(alpha = 0.1f), contentColor = PrimaryColor)
        ) {
            Icon(Icons.Default.Add, contentDescription = null)
            Spacer(Modifier.width(8.dp))
            Text("Add Custom Module")
        }
    }
}

@Composable
fun EditorField(label: String, value: String, onValueChange: (String) -> Unit) {
    var showIconPicker by remember { mutableStateOf(false) }

    if (showIconPicker) {
        AlertDialog(
            onDismissRequest = { showIconPicker = false },
            title = { Text("Pick a Symbol") },
            text = {
                Box(Modifier.height(400.dp).width(500.dp)) {
                    IconBrowser { 
                        onValueChange(it)
                        showIconPicker = false
                    }
                }
            },
            confirmButton = {},
            backgroundColor = SurfaceColor,
            contentColor = TextColor
        )
    }

    Column(modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(label, style = MaterialTheme.typography.caption, color = TextMuted, modifier = Modifier.weight(1f))
            if (label.contains("Symbol", ignoreCase = true)) {
                TextButton(onClick = { showIconPicker = true }, contentPadding = PaddingValues(0.dp)) {
                    Icon(Icons.Default.EmojiEmotions, null, modifier = Modifier.size(16.dp))
                    Spacer(Modifier.width(4.dp))
                    Text("Pick Symbol", style = MaterialTheme.typography.caption)
                }
            }
        }
        TextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier.fillMaxWidth().padding(top = 4.dp).clip(RoundedCornerShape(4.dp)),
            colors = TextFieldDefaults.textFieldColors(backgroundColor = SurfaceColor, textColor = TextColor)
        )
    }
}

fun main() = application {
    val windowState = rememberWindowState(width = 1300.dp, height = 900.dp)
    Window(onCloseRequest = ::exitApplication, title = "Star Command Desktop", state = windowState) { App() }
}
