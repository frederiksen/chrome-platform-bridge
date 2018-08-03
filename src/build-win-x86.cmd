echo off
echo Building...
dotnet publish NativeMessagingHost -c Release -r win-x86
echo To build an installer navigate to .\Platforms\Windows