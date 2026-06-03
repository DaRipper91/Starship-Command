package com.daripper91.starcommand.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.daripper91.starcommand.data.ThemeRepository
import com.daripper91.starcommand.domain.ThemeConfig
import com.daripper91.starcommand.domain.ThemeDocument
import com.daripper91.starcommand.domain.ThemeMetadata
import com.daripper91.starcommand.domain.TomlExporter
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class ThemeEditorViewModel(
    private val repository: ThemeRepository,
) : ViewModel() {
    private val _state = MutableStateFlow(ThemeDocument())
    val state: StateFlow<ThemeDocument> = _state.asStateFlow()

    init {
        viewModelScope.launch {
            repository.themeFlow.collect { loaded ->
                _state.value = loaded
            }
        }
    }

    fun updateMetadata(transform: (ThemeMetadata) -> ThemeMetadata) {
        _state.update { current -> current.copy(metadata = transform(current.metadata)) }
    }

    fun updateConfig(transform: (ThemeConfig) -> ThemeConfig) {
        _state.update { current -> current.copy(config = transform(current.config)) }
    }

    fun save() {
        viewModelScope.launch {
            repository.save(_state.value)
        }
    }

    fun exportToml(): String = TomlExporter.export(_state.value)

    fun previewLine(): String {
        val c = _state.value.config
        return "${c.gitBranchSymbol}main  ~/Projects/Star_Command  ${c.characterSuccessSymbol}"
    }
}
