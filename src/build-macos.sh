#!/bin/bash
echo "Building..."
dotnet publish NativeMessagingHost -c Release -r osx-x64
echo "To build an installer navigate to .\Platforms\macOS"