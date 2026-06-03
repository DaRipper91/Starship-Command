# Maintainer: DaRipper & Gemini
pkgname=starship-command-enhanced-git
_pkgname=Starship-Command-Enhanced
pkgver=2.0.0
pkgrel=1
pkgdesc="Native Desktop GUI for Starship shell prompt customization (Electron + Python)"
arch=('x86_64' 'aarch64')
url="https://github.com/DaRipper91/Starship-Command-Enhanced"
license=('MIT')
depends=('electron' 'python' 'python-flask' 'python-flask-cors' 'python-flask-sqlalchemy' 'python-paramiko' 'python-werkzeug')
makedepends=('nodejs' 'npm' 'git')
provides=('starship-command-enhanced')
conflicts=('starship-command-enhanced')
install=starship-command-enhanced.install
source=("git+https://github.com/DaRipper91/Starship-Command-Enhanced.git")
md5sums=('SKIP')

build() {
  cd "$srcdir/$_pkgname"
  # 1. Install frontend dependencies
  npm install
  # 2. Build the React GUI
  npm run build
}

package() {
  cd "$srcdir/$_pkgname"
  
  # Create application directory
  install -dm755 "$pkgdir/usr/lib/starship-command-enhanced"
  
  # Copy all necessary files for the Electron app
  cp -r dist server assets main.js preload.js package.json "$pkgdir/usr/lib/starship-command-enhanced/"
  
  # Create the executable script in /usr/bin/
  install -dm755 "$pkgdir/usr/bin"
  printf "#!/bin/bash\nelectron /usr/lib/starship-command-enhanced/main.js \"\$@\"" > "$pkgdir/usr/bin/starship-command-enhanced"
  chmod +x "$pkgdir/usr/bin/starship-command-enhanced"
  
  # Install desktop entry
  install -Dm644 starship-command-enhanced.desktop "$pkgdir/usr/share/applications/starship-command-enhanced.desktop"

  # Install icon for the desktop environment
  install -Dm644 assets/icon.png "$pkgdir/usr/share/icons/hicolor/512x512/apps/starship-command-enhanced.png"
}
