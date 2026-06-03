package com.daripper91.starcommand.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.daripper91.starcommand.data.ThemeRepository

class ThemeEditorViewModelFactory(
    private val repository: ThemeRepository,
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return ThemeEditorViewModel(repository) as T
    }
}
