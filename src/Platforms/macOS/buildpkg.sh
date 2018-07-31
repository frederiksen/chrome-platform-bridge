#!/bin/bash
pkgbuild --root ROOT --identifier com.github.frederiksen.chromeplatformbridge --version 0.1 bookmarks.pkg
hdiutil create -volname platform-bridge-demo -srcfolder ./bookmarks.pkg -ov -format UDZO platform-bridge-demo-macos.dmg
