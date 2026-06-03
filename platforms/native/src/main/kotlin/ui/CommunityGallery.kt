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
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Star
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import core.*

@Composable
fun CommunityGallery(onSelect: (ThemeConfig) -> Unit) {
    val communityThemes = listOf(
        CommunityTheme("Cyberpunk 2077", "Neon yellow and blue theme", ThemeConfig(
            character = CharacterConfig(success_symbol = "[⚡](bold #f3e600)"),
            directory = DirectoryConfig(style = "bold #04d9ff")
        ), "Game"),
        CommunityTheme("Dracula Pro", "Official Dracula color palette", ThemeConfig(
            character = CharacterConfig(success_symbol = "[❯](bold #50fa7b)"),
            directory = DirectoryConfig(style = "bold #bd93f9")
        ), "Official"),
        CommunityTheme("GitHub Dark", "Authentic GitHub experience", ThemeConfig(
            character = CharacterConfig(success_symbol = "[❯](bold #3fb950)"),
            directory = DirectoryConfig(style = "bold #58a6ff")
        ), "Dev"),
        CommunityTheme("Monokai Retro", "Classic 80s vibes", ThemeConfig(
            character = CharacterConfig(success_symbol = "[>>](bold #a6e22e)"),
            directory = DirectoryConfig(style = "bold #fd971f")
        ), "Vintage"),
        CommunityTheme("Oceanic Next", "Calm and professional blue", ThemeConfig(
            directory = DirectoryConfig(style = "bold #6699cc")
        ), "Professional"),
        CommunityTheme("Powerline Pro", "The ultimate powerline setup", ThemeConfig(
            format = "[ \uE0A0 ](bg:#9A348E fg:white)\$directory[ \uE0B0 ](fg:#9A348E bg:#DA627D)\$git_branch[ \uE0B0 ](fg:#DA627D bg:#F9DBBD)\$character",
            directory = DirectoryConfig(style = "bg:#DA627D fg:white")
        ), "Poweruser"),
        CommunityTheme("Hacker Green", "Matrix style terminal", ThemeConfig(
            character = CharacterConfig(success_symbol = "[root@system #](bold green)"),
            directory = DirectoryConfig(style = "bold green")
        ), "Niche"),
        CommunityTheme("Solarized Dark", "High contrast and readable", ThemeConfig(
            directory = DirectoryConfig(style = "bold #268bd2")
        ), "Classic")
    )

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Theme Marketplace", style = MaterialTheme.typography.h4, fontWeight = FontWeight.Bold)
            Spacer(Modifier.width(12.dp))
            Surface(color = Color(0xFF7E57C2).copy(alpha = 0.2f), shape = RoundedCornerShape(16.dp)) {
                Text("BETA", modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp), style = MaterialTheme.typography.caption, color = Color(0xFF7E57C2))
            }
        }
        Text("Browse hundreds of community-crafted Starship layouts.", style = MaterialTheme.typography.body2, color = Color.Gray)
        
        Spacer(Modifier.height(24.dp))
        
        LazyVerticalGrid(
            columns = GridCells.Adaptive(280.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(communityThemes) { theme ->
                Card(
                    backgroundColor = Color(0xFF1E293B),
                    elevation = 4.dp,
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(theme.name, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.h6, modifier = Modifier.weight(1f))
                            Icon(Icons.Default.Star, null, tint = Color.Yellow, modifier = Modifier.size(16.dp))
                        }
                        Surface(
                            color = Color.White.copy(alpha = 0.05f),
                            shape = RoundedCornerShape(4.dp),
                            modifier = Modifier.padding(vertical = 4.dp)
                        ) {
                            Text(theme.category, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp), style = MaterialTheme.typography.caption)
                        }
                        Spacer(Modifier.height(8.dp))
                        Text(theme.description, style = MaterialTheme.typography.body2, color = Color.LightGray, minLines = 2)
                        Spacer(Modifier.height(16.dp))
                        Button(
                            onClick = { onSelect(theme.config) },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.buttonColors(backgroundColor = Color(0xFF334155))
                        ) {
                            Icon(Icons.Default.Download, contentDescription = null, modifier = Modifier.size(18.dp))
                            Spacer(Modifier.width(8.dp))
                            Text("Apply Layout")
                        }
                    }
                }
            }
        }
    }
}

data class CommunityTheme(val name: String, val description: String, val config: ThemeConfig, val category: String)
