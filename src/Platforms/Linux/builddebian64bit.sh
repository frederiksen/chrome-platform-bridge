#!/bin/bash
mkdir -p platform-bridge-demo-linux/DEBIAN
cp control ./platform-bridge-demo-linux/DEBIAN
mkdir -p platform-bridge-demo-linux/etc/opt/chrome/native-messaging-hosts
cp com.github.frederiksen.chromeplatformbridge.json ./platform-bridge-demo-linux/etc/opt/chrome/native-messaging-hosts
mkdir -p platform-bridge-demo-linux/usr/lib/platform-bridge-demo
cp ../../NativeMessagingHost/bin/Release/netcoreapp3.1/linux-x64/publish/* platform-bridge-demo-linux/usr/lib/platform-bridge-demo
# create .deb package
dpkg --build platform-bridge-demo-linux
# cleanup
rm -rf platform-bridge-demo-linux