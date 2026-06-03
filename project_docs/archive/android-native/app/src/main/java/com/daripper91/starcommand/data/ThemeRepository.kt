package com.daripper91.starcommand.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.daripper91.starcommand.domain.ThemeDocument
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

private val Context.themeStore: DataStore<Preferences> by preferencesDataStore(name = "star_command_native")

class ThemeRepository(private val context: Context) {
    private val json = Json {
        ignoreUnknownKeys = true
        prettyPrint = true
    }

    private val themeKey = stringPreferencesKey("theme_document")

    val themeFlow: Flow<ThemeDocument> = context.themeStore.data.map { preferences ->
        val raw = preferences[themeKey]
        if (raw.isNullOrBlank()) {
            ThemeDocument()
        } else {
            runCatching { json.decodeFromString<ThemeDocument>(raw) }
                .getOrElse { ThemeDocument() }
        }
    }

    suspend fun save(theme: ThemeDocument) {
        context.themeStore.edit { preferences ->
            preferences[themeKey] = json.encodeToString(theme)
        }
    }
}
