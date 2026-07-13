# 🧩 Starship Modules Deep Dive

Modules are the building blocks of your prompt. Each module displays a specific piece of information (like your current directory, Git status, or programming language version).

## 🏢 Core Modules

| Module       | Description                              | Common Usage                                |
| :----------- | :--------------------------------------- | :------------------------------------------ |
| `directory`  | Your current path.                       | Use `truncation_length` to keep it short.   |
| `character`  | The prompt symbol (e.g., `➜`).           | Change `success_symbol` and `error_symbol`. |
| `line_break` | Adds a new line.                         | Essential for multi-line prompts.           |
| `status`     | Shows the exit code of the last command. | Useful for debugging failed scripts.        |

## 🌿 Version Control (VCS)

- **`git_branch`**: Shows the current branch name.
- **`git_status`**: Displays icons for staged, modified, and untracked files.
- **`git_metrics`**: Shows the number of lines added/deleted.

## 💻 Language Runtimes

Starship automatically detects the languages used in your project:

- **`nodejs`**: Shows version from `package.json`.
- **`python`**: Shows version from `venv` or `pyproject.toml`.
- **`rust`**: Shows version from `Cargo.toml`.
- **`golang`**: Shows version from `go.mod`.

## 🔋 System & Cloud

- **`battery`**: Shows battery percentage and charging status (Critical for mobile/Termux!).
- **`kubernetes`**: Shows the current context and namespace.
- **`aws / gcloud / azure`**: Displays your active cloud profile.

## 🎨 Customizing a Module

Every module in Starship Command supports these three main properties:

1.  **Symbol**: The icon displayed (e.g., ` ` for Docker).
2.  **Style**: The color and formatting (e.g., `bold blue` or `bg:#ff007f`).
3.  **Format**: The string template that determines how data is shown.
    - _Example:_ `[$symbol$version]($style)`

## 🚀 Creating Custom Modules

If Starship doesn't have a module for what you need, you can create one!

1.  Add a **Custom Module** in the editor.
2.  Provide a **Command** (e.g., `date +%H:%M`).
3.  Set a **When** condition (e.g., `test -f myfile.txt`).
4.  The editor will generate the `[custom.my_module]` block in your TOML automatically.
