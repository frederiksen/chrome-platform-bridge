#!/bin/bash
mkdir -p platform-bridge-demo-linux64bit/DEBIAN
cp control ./platform-bridge-demo-linux64bit/DEBIAN
mkdir -p platform-bridge-demo-linux64bit/etc/opt/chrome/native-messaging-hosts
cp com.github.frederiksen.chromeplatformbridge.json ./platform-bridge-demo-linux64bit/etc/opt/chrome/native-messaging-hosts
mkdir -p platform-bridge-demo-linux64bit/usr/lib/platform-bridge-demo
cp ../../NativeMessagingHost/bin/Release/netcoreapp2.1/linux-x64/publish/* platform-bridge-demo-linux64bit/usr/lib/platform-bridge-demo
# create .deb package
dpkg --build platform-bridge-demo-linux64bit
# cleanup
rm -rf platform-bridge-demo-linux64bit