package com.daripper91.starcommand.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.daripper91.starcommand.domain.ThemeDocument
import com.daripper91.starcommand.ui.theme.Navy900
import com.daripper91.starcommand.ui.theme.TextMuted

@Composable
fun BuildScreen(
    state: ThemeDocument,
    onSave: () -> Unit,
    onUpdateName: (String) -> Unit,
    onUpdateAuthor: (String) -> Unit,
    onUpdateDescription: (String) -> Unit,
    onUpdateFormat: (String) -> Unit,
    onUpdateDirectoryStyle: (String) -> Unit,
    onUpdateSuccessSymbol: (String) -> Unit,
    onUpdateErrorSymbol: (String) -> Unit,
    onUpdateBranchSymbol: (String) -> Unit,
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Navy900),
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text("Theme Metadata", color = TextMuted)

            OutlinedTextField(
                value = state.metadata.name,
                onValueChange = onUpdateName,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("Theme Name") },
            )
            OutlinedTextField(
                value = state.metadata.author,
                onValueChange = onUpdateAuthor,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("Author") },
            )
            OutlinedTextField(
                value = state.metadata.description,
                onValueChange = onUpdateDescription,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("Description") },
            )

            Text("Prompt Configuration", color = TextMuted)

            OutlinedTextField(
                value = state.config.format,
                onValueChange = onUpdateFormat,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("format") },
            )
            OutlinedTextField(
                value = state.config.directoryStyle,
                onValueChange = onUpdateDirectoryStyle,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("directory.style") },
            )
            OutlinedTextField(
                value = state.config.characterSuccessSymbol,
                onValueChange = onUpdateSuccessSymbol,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("character.success_symbol") },
            )
            OutlinedTextField(
                value = state.config.characterErrorSymbol,
                onValueChange = onUpdateErrorSymbol,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("character.error_symbol") },
            )
            OutlinedTextField(
                value = state.config.gitBranchSymbol,
                onValueChange = onUpdateBranchSymbol,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("git_branch.symbol") },
            )

            Button(
                onClick = onSave,
                modifier = Modifier.fillMaxWidth(),
            ) {
                Text("Save Theme")
            }
        }
    }
}
