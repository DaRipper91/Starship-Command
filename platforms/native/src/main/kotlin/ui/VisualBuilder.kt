package ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import core.*
import GenericModuleEditor
import StyleEditor
import EditorField

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun VisualPromptBuilder(themeDoc: ThemeDocument, onUpdate: (ThemeDocument) -> Unit) {
    var selectedSegment by remember { mutableStateOf<String?>(null) }
    val segments = remember(themeDoc.config.format) {
        themeDoc.config.format.split("$").filter { it.isNotEmpty() }.map { "$" + it }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Visual Prompt Architect", style = MaterialTheme.typography.h4, color = Color.White)
        Text("Click a block to customize it, or use arrows to reorder.", style = MaterialTheme.typography.body2, color = Color.Gray)
        
        Spacer(Modifier.height(32.dp))

        // The Canvas
        Card(
            backgroundColor = Color(0xFF0F172A),
            modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp),
            elevation = 8.dp,
            shape = RoundedCornerShape(12.dp),
            border = BorderStroke(1.dp, Color(0xFF1E293B))
        ) {
            FlowRow(
                modifier = Modifier.padding(24.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                segments.forEachIndexed { index, segment ->
                    val isSelected = selectedSegment == segment
                    PromptBlock(
                        name = segment,
                        isSelected = isSelected,
                        onSelect = { selectedSegment = segment },
                        onMoveLeft = {
                            if (index > 0) {
                                val newSegments = segments.toMutableList()
                                val temp = newSegments[index]
                                newSegments[index] = newSegments[index - 1]
                                newSegments[index - 1] = temp
                                onUpdate(themeDoc.copy(config = themeDoc.config.copy(format = newSegments.joinToString(""))))
                            }
                        },
                        onMoveRight = {
                            if (index < segments.size - 1) {
                                val newSegments = segments.toMutableList()
                                val temp = newSegments[index]
                                newSegments[index] = newSegments[index + 1]
                                newSegments[index + 1] = temp
                                onUpdate(themeDoc.copy(config = themeDoc.config.copy(format = newSegments.joinToString(""))))
                            }
                        },
                        onDelete = {
                            val newSegments = segments.toMutableList()
                            newSegments.removeAt(index)
                            onUpdate(themeDoc.copy(config = themeDoc.config.copy(format = newSegments.joinToString(""))))
                            if (isSelected) selectedSegment = null
                        }
                    )
                }

                // Add Button
                AddBlockButton { module ->
                    val newFormat = themeDoc.config.format + module
                    onUpdate(themeDoc.copy(config = themeDoc.config.copy(format = newFormat)))
                }
            }
        }

        Spacer(Modifier.height(32.dp))

        // Inspector Panel
        if (selectedSegment != null) {
            val moduleName = selectedSegment!!.removePrefix("$")
            Card(
                backgroundColor = Color(0xFF1E293B),
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(Modifier.padding(24.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Settings, null, tint = Color(0xFF7E57C2))
                        Spacer(Modifier.width(12.dp))
                        Text("Edit: $moduleName", style = MaterialTheme.typography.h6)
                        Spacer(Modifier.weight(1f))
                        IconButton(onClick = { selectedSegment = null }) {
                            Icon(Icons.Default.Close, null)
                        }
                    }
                    
                    Divider(Modifier.padding(vertical = 16.dp), color = Color.Gray.copy(alpha = 0.2f))

                    // Contextual Editor based on what was clicked
                    Box(Modifier.fillMaxWidth()) {
                        ModuleInspector(moduleName, themeDoc, onUpdate)
                    }
                }
            }
        } else {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Select a part of the prompt above to edit its colors and icons.", color = Color.Gray)
            }
        }
    }
}

@Composable
fun PromptBlock(
    name: String,
    isSelected: Boolean,
    onSelect: () -> Unit,
    onMoveLeft: () -> Unit,
    onMoveRight: () -> Unit,
    onDelete: () -> Unit
) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onMoveLeft, modifier = Modifier.size(24.dp)) {
                Icon(Icons.Default.ArrowBackIos, null, modifier = Modifier.size(12.dp), tint = Color.Gray)
            }
            
            Surface(
                shape = RoundedCornerShape(8.dp),
                color = if (isSelected) Color(0xFF7E57C2) else Color(0xFF1E293B),
                border = BorderStroke(2.dp, if (isSelected) Color.White else Color.Transparent),
                modifier = Modifier.clickable(onClick = onSelect)
            ) {
                Row(Modifier.padding(horizontal = 12.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(name, fontWeight = FontWeight.Bold, color = Color.White)
                    Spacer(Modifier.width(8.dp))
                    Icon(
                        Icons.Default.Delete,
                        null,
                        modifier = Modifier.size(14.dp).clickable { onDelete() },
                        tint = if (isSelected) Color.White else Color.Gray
                    )
                }
            }

            IconButton(onClick = onMoveRight, modifier = Modifier.size(24.dp)) {
                Icon(Icons.Default.ArrowForwardIos, null, modifier = Modifier.size(12.dp), tint = Color.Gray)
            }
        }
    }
}

@Composable
fun AddBlockButton(onAdd: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    val available = listOf("directory", "git_branch", "nodejs", "rust", "python", "aws", "line_break", "character")

    Box {
        Surface(
            shape = RoundedCornerShape(8.dp),
            color = Color.Transparent,
            border = BorderStroke(1.dp, Color.Gray.copy(alpha = 0.5f)),
            modifier = Modifier.clickable { expanded = true }
        ) {
            Row(Modifier.padding(horizontal = 12.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Add, null, modifier = Modifier.size(16.dp), tint = Color.Gray)
                Text("Add", color = Color.Gray, modifier = Modifier.padding(start = 4.dp))
            }
        }

        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }, modifier = Modifier.background(Color(0xFF1E293B))) {
            available.forEach { module ->
                DropdownMenuItem(onClick = {
                    onAdd("$" + module)
                    expanded = false
                }) {
                    Text(module, color = Color.White)
                }
            }
        }
    }
}

@Composable
fun ModuleInspector(name: String, themeDoc: ThemeDocument, onUpdate: (ThemeDocument) -> Unit) {
    when (name) {
        "directory" -> {
            StyleEditor(themeDoc.config.directory.style) {
                onUpdate(themeDoc.copy(config = themeDoc.config.copy(directory = themeDoc.config.directory.copy(style = it))))
            }
        }
        "git_branch" -> {
            EditorField("Symbol", themeDoc.config.git_branch.symbol) {
                onUpdate(themeDoc.copy(config = themeDoc.config.copy(git_branch = themeDoc.config.git_branch.copy(symbol = it))))
            }
            StyleEditor(themeDoc.config.git_branch.style) {
                onUpdate(themeDoc.copy(config = themeDoc.config.copy(git_branch = themeDoc.config.git_branch.copy(style = it))))
            }
        }
        "nodejs" -> GenericModuleEditor(themeDoc.config.nodejs) { onUpdate(themeDoc.copy(config = themeDoc.config.copy(nodejs = it))) }
        "rust" -> GenericModuleEditor(themeDoc.config.rust) { onUpdate(themeDoc.copy(config = themeDoc.config.copy(rust = it))) }
        "python" -> GenericModuleEditor(themeDoc.config.python) { onUpdate(themeDoc.copy(config = themeDoc.config.copy(python = it))) }
        "aws" -> GenericModuleEditor(themeDoc.config.aws) { onUpdate(themeDoc.copy(config = themeDoc.config.copy(aws = it))) }
        "character" -> {
            EditorField("Success Symbol", themeDoc.config.character.success_symbol) {
                onUpdate(themeDoc.copy(config = themeDoc.config.copy(character = themeDoc.config.character.copy(success_symbol = it))))
            }
            EditorField("Error Symbol", themeDoc.config.character.error_symbol) {
                onUpdate(themeDoc.copy(config = themeDoc.config.copy(character = themeDoc.config.character.copy(error_symbol = it))))
            }
        }
        else -> Text("Generic module settings for $name coming soon.")
    }
}
