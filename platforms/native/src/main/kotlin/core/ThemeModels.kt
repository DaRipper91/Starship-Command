package core

import kotlinx.serialization.Serializable

@Serializable
data class ThemeMetadata(
    val id: String = "default",
    val name: String = "Untitled Theme",
    val author: String = "",
    val description: String = "",
)

@Serializable
data class CharacterConfig(
    val success_symbol: String = "[❯](bold green)",
    val error_symbol: String = "[❯](bold red)",
)

@Serializable
data class DirectoryConfig(
    val style: String = "bold cyan",
    val truncation_length: Int = 3,
)

@Serializable
data class GitBranchConfig(
    val symbol: String = " ",
    val style: String = "bold purple",
)

@Serializable
data class ModuleConfig(
    val symbol: String = "",
    val style: String = "bold white",
    val enabled: Boolean = false,
    val format: String = "[\$symbol\$version](\$style) "
)

@Serializable
data class ThemeConfig(
    val format: String = "\$directory\$git_branch\$nodejs\$rust\$python\$aws\$line_break\$character",
    val add_newline: Boolean = true,
    val character: CharacterConfig = CharacterConfig(),
    val directory: DirectoryConfig = DirectoryConfig(),
    val git_branch: GitBranchConfig = GitBranchConfig(),
    val nodejs: ModuleConfig = ModuleConfig(" ", "bold green", true),
    val rust: ModuleConfig = ModuleConfig(" ", "bold red", true),
    val python: ModuleConfig = ModuleConfig("🐍 ", "bold yellow", true),
    val aws: ModuleConfig = ModuleConfig("☁️  ", "bold #ff9900", false),
    val custom: Map<String, CustomModuleConfig> = emptyMap()
)

@Serializable
data class CustomModuleConfig(
    val command: String = "",
    val symbol: String = "",
    val style: String = "bold white",
    val format: String = "[\$symbol\$output](\$style) "
)

@Serializable
data class ThemeDocument(
    val metadata: ThemeMetadata = ThemeMetadata(),
    val config: ThemeConfig = ThemeConfig(),
)

data class MockScenario(
    val name: String,
    val description: String,
    val values: Map<String, String>
)

object MockScenarios {
    val Clean = MockScenario(
        "Clean State",
        "Clean git repository on main branch",
        mapOf(
            "directory" to "~/projects/star-command",
            "git_branch" to "main",
            "character" to "❯"
        )
    )
    val Dev = MockScenario(
        "Development",
        "Active development in node project",
        mapOf(
            "directory" to "~/work/api-service",
            "git_branch" to "feature/auth",
            "nodejs" to "v18.16.0",
            "rust" to "1.75.0",
            "character" to "❯"
        )
    )
    val Error = MockScenario(
        "Error State",
        "Failed command execution",
        mapOf(
            "directory" to "~/projects/broken",
            "git_branch" to "main",
            "character" to "✖"
        )
    )
    val List = listOf(Clean, Dev, Error)
}
