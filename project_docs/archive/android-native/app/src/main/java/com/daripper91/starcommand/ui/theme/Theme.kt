package com.daripper91.starcommand.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkScheme = darkColorScheme(
    primary = Blue400,
    secondary = Cyan400,
)

@Composable
fun StarCommandTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkScheme,
        typography = androidx.compose.material3.Typography(),
        content = content,
    )
}
