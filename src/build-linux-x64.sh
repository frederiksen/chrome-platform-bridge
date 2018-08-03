#!/bin/bash
echo "Building..."
dotnet publish NativeMessagingHost -c Release -r linux-x64
echo "To build an installer navigate to ./Platforms/Linux"