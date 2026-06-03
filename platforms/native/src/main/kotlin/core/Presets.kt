package core

object Presets {
    val List = mapOf(
        "Default Starship" to ThemeConfig(),
        
        "Minimalist" to ThemeConfig(
            format = "\$directory\$character",
            add_newline = false,
            directory = DirectoryConfig(style = "bold blue")
        ),

        "Pure Powerline" to ThemeConfig(
            format = "[ \uE0A0 ](bg:#9A348E fg:white)\$directory[ \uE0B0 ](fg:#9A348E bg:#DA627D)\$git_branch[ \uE0B0 ](fg:#DA627D bg:#F9DBBD)\$character",
            add_newline = true,
            directory = DirectoryConfig(style = "bg:#DA627D fg:white"),
            git_branch = GitBranchConfig(symbol = "\uE0A0 ", style = "bg:#F9DBBD fg:#DA627D")
        ),

        "Tokyo Night" to ThemeConfig(
            format = "\$directory\$git_branch\$character",
            directory = DirectoryConfig(style = "bold #7aa2f7"),
            git_branch = GitBranchConfig(style = "bold #bb9af7"),
            character = CharacterConfig(success_symbol = "[❯](bold #9ece6a)", error_symbol = "[❯](bold #f7768e)")
        ),

        "Cyberpunk" to ThemeConfig(
            format = "\$directory\$git_branch\$character",
            directory = DirectoryConfig(style = "bold #f3e600"),
            git_branch = GitBranchConfig(style = "bold #04d9ff"),
            character = CharacterConfig(success_symbol = "[⚡](bold #f3e600)", error_symbol = "[✖](bold #ff003c)")
        ),

        "Nordic" to ThemeConfig(
            format = "\$directory\$git_branch\$character",
            directory = DirectoryConfig(style = "bold #88C0D0"),
            git_branch = GitBranchConfig(style = "bold #81A1C1"),
            character = CharacterConfig(success_symbol = "[λ](bold #A3BE8C)", error_symbol = "[λ](bold #BF616A)")
        ),

        "Dracula" to ThemeConfig(
            format = "\$directory\$git_branch\$character",
            directory = DirectoryConfig(style = "bold #bd93f9"),
            git_branch = GitBranchConfig(style = "bold #ff79c6"),
            character = CharacterConfig(success_symbol = "[❯](bold #50fa7b)", error_symbol = "[❯](bold #ff5555)")
        ),

        "Catppuccin" to ThemeConfig(
            format = "\$directory\$git_branch\$character",
            directory = DirectoryConfig(style = "bold #cba6f7"),
            git_branch = GitBranchConfig(style = "bold #f5c2e7"),
            character = CharacterConfig(success_symbol = "[❯](bold #a6e3a1)", error_symbol = "[❯](bold #f38ba8)")
        )
    )
}
