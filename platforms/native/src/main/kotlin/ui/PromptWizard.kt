package ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import core.*

@Composable
fun PromptWizard(currentConfig: ThemeConfig, onUpdate: (ThemeConfig) -> Unit) {
    var step by remember { mutableStateOf(1) }

    Column(modifier = Modifier.fillMaxSize().padding(24.dp).verticalScroll(rememberScrollState())) {
        Text("Prompt Builder Wizard", style = MaterialTheme.typography.h4, color = Color.White)
        Text("Build your perfect prompt in seconds.", style = MaterialTheme.typography.body1, color = Color.Gray)
        
        Spacer(Modifier.height(32.dp))

        // Progress indicator
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            WizardStep("1. Style", step >= 1)
            WizardStep("2. Modules", step >= 2)
            WizardStep("3. Finish", step >= 3)
        }

        Spacer(Modifier.height(32.dp))

        when (step) {
            1 -> StyleStep(onSelect = { 
                onUpdate(it)
                step = 2
            })
            2 -> ModuleStep(currentConfig, onToggle = { onUpdate(it) }, onNext = { step = 3 })
            3 -> FinishStep(onBack = { step = 1 })
        }
    }
}

@Composable
fun WizardStep(label: String, isActive: Boolean) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            Modifier.size(40.dp).clip(RoundedCornerShape(20.dp))
                .background(if (isActive) Color(0xFF7E57C2) else Color(0xFF1E293B)),
            contentAlignment = Alignment.Center
        ) {
            if (isActive && false /* show check if done */) {
                Icon(Icons.Default.CheckCircle, null, tint = Color.White)
            } else {
                Text(label.take(1), color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
        Text(label, style = MaterialTheme.typography.caption, color = if (isActive) Color.White else Color.Gray)
    }
}

@Composable
fun StyleStep(onSelect: (ThemeConfig) -> Unit) {
    Text("Select a base style", style = MaterialTheme.typography.h6)
    Spacer(Modifier.height(16.dp))
    
    val styles = Presets.List.keys.toList()
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        styles.forEach { name ->
            Card(
                backgroundColor = Color(0xFF1E293B),
                modifier = Modifier.fillMaxWidth().clickable { onSelect(Presets.List[name]!!) }
            ) {
                Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(name, fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
                    Icon(Icons.Default.CheckCircle, null, tint = Color.Gray.copy(alpha = 0.3f))
                }
            }
        }
    }
}

@Composable
fun ModuleStep(config: ThemeConfig, onToggle: (ThemeConfig) -> Unit, onNext: () -> Unit) {
    Text("Toggle Modules", style = MaterialTheme.typography.h6)
    Spacer(Modifier.height(16.dp))

    val modules = listOf(
        "Node.js" to { c: ThemeConfig, b: Boolean -> c.copy(nodejs = c.nodejs.copy(enabled = b)) },
        "Rust" to { c: ThemeConfig, b: Boolean -> c.copy(rust = c.rust.copy(enabled = b)) },
        "Python" to { c: ThemeConfig, b: Boolean -> c.copy(python = c.python.copy(enabled = b)) },
        "AWS" to { c: ThemeConfig, b: Boolean -> c.copy(aws = c.aws.copy(enabled = b)) }
    )

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        modules.forEach { (name, updater) ->
            val isEnabled = when(name) {
                "Node.js" -> config.nodejs.enabled
                "Rust" -> config.rust.enabled
                "Python" -> config.python.enabled
                "AWS" -> config.aws.enabled
                else -> false
            }
            
            Row(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(8.dp)).background(Color(0xFF1E293B)).padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(name, modifier = Modifier.weight(1f))
                Switch(isEnabled, onCheckedChange = { onToggle(updater(config, it)) })
            }
        }
    }

    Spacer(Modifier.height(32.dp))
    Button(onClick = onNext, modifier = Modifier.fillMaxWidth()) {
        Text("Continue")
    }
}

@Composable
fun FinishStep(onBack: () -> Unit) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Icon(Icons.Default.CheckCircle, null, modifier = Modifier.size(64.dp), tint = Color.Green)
        Spacer(Modifier.height(16.dp))
        Text("Ready to go!", style = MaterialTheme.typography.h5)
        Text("Your prompt has been generated and is ready to be saved.", textAlign = androidx.compose.ui.text.style.TextAlign.Center)
        
        Spacer(Modifier.height(32.dp))
        Button(onClick = onBack) {
            Text("Start Over")
        }
    }
}
