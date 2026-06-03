package com.daripper91.starcommand.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.daripper91.starcommand.domain.ThemeDocument
import com.daripper91.starcommand.ui.screens.BuildScreen
import com.daripper91.starcommand.ui.screens.ExportScreen
import com.daripper91.starcommand.ui.screens.PreviewScreen
import com.daripper91.starcommand.ui.theme.Navy950

private enum class NativeTab(val title: String, val glyph: String) {
    Build("Build", "⚙"),
    Preview("Preview", "⌨"),
    Export("Export", "⇩"),
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StarCommandNativeApp(
    state: ThemeDocument,
    previewLine: String,
    exportToml: String,
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
    var tab by rememberSaveable { mutableStateOf(NativeTab.Build) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Star Command Native") },
            )
        },
        bottomBar = {
            NavigationBar {
                NativeTab.entries.forEach { item ->
                    NavigationBarItem(
                        selected = tab == item,
                        onClick = { tab = item },
                        icon = { IconPlaceholder(item.glyph) },
                        label = { Text(item.title) },
                    )
                }
            }
        },
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Navy950)
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            when (tab) {
                NativeTab.Build -> BuildScreen(
                    state = state,
                    onSave = onSave,
                    onUpdateName = onUpdateName,
                    onUpdateAuthor = onUpdateAuthor,
                    onUpdateDescription = onUpdateDescription,
                    onUpdateFormat = onUpdateFormat,
                    onUpdateDirectoryStyle = onUpdateDirectoryStyle,
                    onUpdateSuccessSymbol = onUpdateSuccessSymbol,
                    onUpdateErrorSymbol = onUpdateErrorSymbol,
                    onUpdateBranchSymbol = onUpdateBranchSymbol,
                )

                NativeTab.Preview -> PreviewScreen(previewLine = previewLine)
                NativeTab.Export -> ExportScreen(exportToml = exportToml)
            }
        }
    }
}

@Composable
private fun IconPlaceholder(glyph: String) {
    Text(text = glyph)
}
