package ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import core.ColorUtils.toHex

@Composable
fun RGBSliderPicker(initialColor: Color, onColorSelected: (Color) -> Unit) {
    var r by remember { mutableStateOf(initialColor.red) }
    var g by remember { mutableStateOf(initialColor.green) }
    var b by remember { mutableStateOf(initialColor.blue) }

    val currentColor = Color(r, g, b)

    Column(
        modifier = Modifier.padding(24.dp).width(400.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Preview Box
        Box(
            modifier = Modifier
                .size(120.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(currentColor)
                .border(2.dp, Color.White.copy(alpha = 0.3f), RoundedCornerShape(12.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                currentColor.toHex(),
                color = if ((r + g + b) / 3 > 0.5f) Color.Black else Color.White,
                fontWeight = FontWeight.Bold,
                style = MaterialTheme.typography.h6
            )
        }

        Spacer(Modifier.height(32.dp))

        // Red Slider
        ColorSlider(
            label = "Red",
            value = r,
            onValueChange = { r = it; onColorSelected(Color(r, g, b)) },
            activeColor = Color.Red
        )

        // Green Slider
        ColorSlider(
            label = "Green",
            value = g,
            onValueChange = { g = it; onColorSelected(Color(r, g, b)) },
            activeColor = Color.Green
        )

        // Blue Slider
        ColorSlider(
            label = "Blue",
            value = b,
            onValueChange = { b = it; onColorSelected(Color(r, g, b)) },
            activeColor = Color.Blue
        )
    }
}

@Composable
private fun ColorSlider(label: String, value: Float, onValueChange: (Float) -> Unit, activeColor: Color) {
    Column(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Text(label, style = MaterialTheme.typography.caption, color = Color.Gray)
            Text((value * 255).toInt().toString(), style = MaterialTheme.typography.caption, fontWeight = FontWeight.Bold)
        }
        Slider(
            value = value,
            onValueChange = onValueChange,
            colors = SliderDefaults.colors(
                thumbColor = activeColor,
                activeTrackColor = activeColor.copy(alpha = 0.5f),
                inactiveTrackColor = Color.Gray.copy(alpha = 0.2f)
            )
        )
    }
}
