#!/bin/bash
mkdir -p platform-bridge-demo-linux64bit/usr/lib/platform-bridge-demo
cp ../../NativeMessagingHost/bin/Release/netcoreapp2.1/linux-x64/publish/* platform-bridge-demo-linux64bit/usr/lib/platform-bridge-demo
dpkg --build platform-bridge-demo-linux64bit
# cleanup
rm -rf platform-bridge-demo-linux64bit/usr/lib/platform-bridge-demo