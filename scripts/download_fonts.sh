#!/bin/bash
# Download source Nerd Fonts for local subsetting and packaging
DEST="public/fonts"
mkdir -p $DEST

# Using v3.2.1 as it is stable and matches the new directory structure
# Format: RepoPath/FontName.ttf
FONTS=(
  "FiraCode/Regular/FiraCodeNerdFont-Regular.ttf"
  "JetBrainsMono/Ligatures/Regular/JetBrainsMonoNerdFont-Regular.ttf"
  "Hack/Regular/HackNerdFont-Regular.ttf"
  "RobotoMono/Regular/RobotoMonoNerdFont-Regular.ttf"
  "Meslo/M/Regular/MesloLGMNerdFont-Regular.ttf"
)

BASE_URL="https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v3.2.1/patched-fonts"

for F in "${FONTS[@]}"; do
  FILENAME=$(basename "$F")
  echo "Downloading $FILENAME..."
  curl -L "$BASE_URL/$F" -o "$DEST/$FILENAME"
done
