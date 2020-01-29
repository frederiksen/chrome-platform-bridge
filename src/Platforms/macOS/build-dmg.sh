#!/bin/bash
mkdir -p ROOT/Library/Google/Chrome/NativeMessagingHosts
cp ./com.github.frederiksen.chromeplatformbridge.json ./ROOT/Library/Google/Chrome/NativeMessagingHosts
mkdir -p ROOT/Library/chrome-platform-bridge-demo
cp ../../NativeMessagingHost/bin/Release/netcoreapp3.1/osx-x64/publish/* ROOT/Library/chrome-platform-bridge-demo
chmod +x ROOT/Library/chrome-platform-bridge-demo/NativeMessagingHost
# create the pkg then sign it then put it in a dmg
pkgbuild --root ROOT --identifier com.myfunkyapps.chromeplatformbridge --version 1.0 chrome-platform-bridge.unsigned.pkg
productsign --sign "Developer ID Installer: MyFunkyApps.com" chrome-platform-bridge.unsigned.pkg chrome-platform-bridge.pkg
hdiutil create -volname platform-bridge-demo -srcfolder ./chrome-platform-bridge.pkg -ov -format UDZO platform-bridge-demo-macos.dmg
# cleanup
rm -rf ROOT
