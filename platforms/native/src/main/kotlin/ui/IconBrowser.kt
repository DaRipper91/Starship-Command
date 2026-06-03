package ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import core.NerdFonts
import NerdFontFamily

import java.awt.Toolkit
import java.awt.datatransfer.StringSelection

@Composable
fun IconBrowser(onSelect: (String) -> Unit) {
    var searchTerm by remember { mutableStateOf("") }
    val filteredIcons = remember(searchTerm) {
        NerdFonts.Symbols.filter { it.name.contains(searchTerm, ignoreCase = true) || it.category.contains(searchTerm, ignoreCase = true) }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        TextField(
            value = searchTerm,
            onValueChange = { searchTerm = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("Search Nerd Fonts...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            colors = TextFieldDefaults.textFieldColors(
                backgroundColor = Color(0xFF1E293B),
                textColor = Color.White
            )
        )
        
        Spacer(Modifier.height(16.dp))
        
        LazyVerticalGrid(
            columns = GridCells.Adaptive(64.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(filteredIcons) { symbol ->
                Card(
                    backgroundColor = Color(0xFF334155),
                    modifier = Modifier
                        .aspectRatio(1f)
                        .clickable { 
                            val selection = StringSelection(symbol.glyph)
                            Toolkit.getDefaultToolkit().systemClipboard.setContents(selection, selection)
                            onSelect(symbol.glyph) 
                        }
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(
                            text = symbol.glyph,
                            style = MaterialTheme.typography.h5,
                            fontFamily = NerdFontFamily
                        )
                    }
                }
            }
        }
    }
}
