package ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun AsciiBanner() {
    val logo = """
          _____ _______  _      _____     _____ ____  __  __ __  __          _   _ _____  
         / ____|__   __|/ \    |  __ \   / ____/ __ \|  \/  |  \/  |   /\   | \ | |  __ \ 
        | (___    | |  / _ \   | |__) | | |   | |  | | \  / | \  / |  /  \  |  \| | |  | |
         \___ \   | | / ___ \  |  _  /  | |   | |  | | |\/| | |\/| | / /\ \ | . ` | |  | |
         ____) |  | |/ /   \ \ | | \ \  | |___| |__| | |  | | |  | |/ ____ \| |\  | |__| |
        |_____/   |_/_/     \_\|_|  \_\  \_____\____/|_|  |_|_|  |_/_/    \_\_| \_|_____/ 
    """.trimIndent()

    Column(
        modifier = Modifier.fillMaxWidth().background(Color.Black).padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = logo,
            color = Color(0xFF00FF00),
            fontFamily = FontFamily.Monospace,
            fontSize = 10.sp,
            lineHeight = 12.sp
        )
        Text(
            text = "--- VINTAGE TERMINAL PROTOCOL ACTIVE ---",
            color = Color(0xFF00AA00),
            style = MaterialTheme.typography.caption,
            modifier = Modifier.padding(top = 8.dp)
        )
    }
}
