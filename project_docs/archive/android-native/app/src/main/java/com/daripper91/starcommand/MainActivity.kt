package com.daripper91.starcommand

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.daripper91.starcommand.data.ThemeRepository
import com.daripper91.starcommand.ui.StarCommandNativeApp
import com.daripper91.starcommand.ui.theme.StarCommandTheme
import com.daripper91.starcommand.viewmodel.ThemeEditorViewModel
import com.daripper91.starcommand.viewmodel.ThemeEditorViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val repository = ThemeRepository(applicationContext)
        val factory = ThemeEditorViewModelFactory(repository)

        setContent {
            StarCommandTheme {
                val vm: ThemeEditorViewModel = viewModel(factory = factory)
                val state by vm.state.collectAsStateWithLifecycle()

                StarCommandNativeApp(
                    state = state,
                    previewLine = vm.previewLine(),
                    exportToml = vm.exportToml(),
                    onSave = vm::save,
                    onUpdateName = { name ->
                        vm.updateMetadata { it.copy(name = name) }
                    },
                    onUpdateAuthor = { author ->
                        vm.updateMetadata { it.copy(author = author) }
                    },
                    onUpdateDescription = { description ->
                        vm.updateMetadata { it.copy(description = description) }
                    },
                    onUpdateFormat = { format ->
                        vm.updateConfig { it.copy(format = format) }
                    },
                    onUpdateDirectoryStyle = { style ->
                        vm.updateConfig { it.copy(directoryStyle = style) }
                    },
                    onUpdateSuccessSymbol = { symbol ->
                        vm.updateConfig { it.copy(characterSuccessSymbol = symbol) }
                    },
                    onUpdateErrorSymbol = { symbol ->
                        vm.updateConfig { it.copy(characterErrorSymbol = symbol) }
                    },
                    onUpdateBranchSymbol = { symbol ->
                        vm.updateConfig { it.copy(gitBranchSymbol = symbol) }
                    },
                )
            }
        }
    }
}
