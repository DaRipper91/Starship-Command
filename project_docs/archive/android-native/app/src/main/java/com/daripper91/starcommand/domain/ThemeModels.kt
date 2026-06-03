package com.daripper91.starcommand.domain

import kotlinx.serialization.Serializable

@Serializable
data class ThemeMetadata(
    val id: String = "default",
    val name: String = "Untitled Theme",
    val author: String = "",
    val description: String = "",
)

@Serializable
data class ModuleStyle(
    val format: String = "",
    val style: String = "",
    val symbol: String = "",
)

@Serializable
data class ThemeConfig(
    val format: String = "\$directory\$git_branch\$line_break\$character",
    val addNewline: Boolean = true,
    val characterSuccessSymbol: String = "[❯](bold green)",
    val characterErrorSymbol: String = "[❯](bold red)",
    val directoryStyle: String = "bold cyan",
    val directoryTruncation: Int = 3,
    val gitBranchSymbol: String = " ",
)

@Serializable
data class ThemeDocument(
    val metadata: ThemeMetadata = ThemeMetadata(),
    val config: ThemeConfig = ThemeConfig(),
)
