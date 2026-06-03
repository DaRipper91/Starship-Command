package com.daripper91.starcommand.domain

object TomlExporter {
    fun export(theme: ThemeDocument): String {
        val c = theme.config
        val m = theme.metadata

        return buildString {
            appendLine("format = \"${escape(c.format)}\"")
            appendLine("add_newline = ${c.addNewline}")
            appendLine()

            appendLine("[character]")
            appendLine("success_symbol = \"${escape(c.characterSuccessSymbol)}\"")
            appendLine("error_symbol = \"${escape(c.characterErrorSymbol)}\"")
            appendLine()

            appendLine("[directory]")
            appendLine("style = \"${escape(c.directoryStyle)}\"")
            appendLine("truncation_length = ${c.directoryTruncation}")
            appendLine()

            appendLine("[git_branch]")
            appendLine("symbol = \"${escape(c.gitBranchSymbol)}\"")
            appendLine()

            appendLine("[starship_editor]")
            appendLine("name = \"${escape(m.name)}\"")
            appendLine("author = \"${escape(m.author)}\"")
            appendLine("description = \"${escape(m.description)}\"")
        }
    }

    private fun escape(value: String): String = value
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
}
