Output assets/showcase.gif

Set FontSize 20
Set FontFamily "JetBrainsMono Nerd Font"
Set Width 1200
Set Height 450
Set Theme "Catppuccin Mocha"
Set WindowBar Colorful
Set Margin 20
Set MarginFill "#1e1e2e"
Set BorderRadius 10

Hide
Type 'eval "$(starship init bash)"'
Enter
Type "export STARSHIP_CONFIG=$(pwd)/assets/showcase-starship.toml"
Enter
Type "clear"
Enter
Show

Sleep 1.5s
Type "echo '🚀 Welcome to Starship Command Enhanced!'"
Enter
Sleep 2s

Type "npm run dev"
Enter
Sleep 2s
Ctrl+C

Type "git status"
Enter
Sleep 2s
