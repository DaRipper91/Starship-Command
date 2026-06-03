package com.daripper91.starcommand.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.daripper91.starcommand.ui.theme.Navy900
import com.daripper91.starcommand.ui.theme.TextMuted
import com.daripper91.starcommand.ui.theme.TextPrimary

@Composable
fun ExportScreen(exportToml: String) {
    Column(
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text("Export TOML", color = TextMuted)
        Text(
            "Copy and place this in ~/.config/starship.toml",
            color = TextMuted,
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Navy900)
                .padding(14.dp)
                .verticalScroll(rememberScrollState()),
        ) {
            Text(exportToml, color = TextPrimary)
        }
    }
}
