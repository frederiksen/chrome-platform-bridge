echo off
echo The WiX Toolset version 3.11 is required. Download it from here: http://wixtoolset.org/
set WIX_BIN=c:\Program Files (x86)\WiX Toolset v3.11\bin\
echo Harvest...
"%WIX_BIN%heat.exe" dir ..\..\NativeMessagingHost\bin\Release\netcoreapp2.1\win-x86\publish -o out.wxs -cg NativeMessagingHostGroup -srd -sfrag -gg -g1 -dr INSTALLFOLDER
echo Now doing 'candle' and 'light'
"%WIX_BIN%candle.exe" out.wxs
"%WIX_BIN%candle.exe" installer.wxs -ext WixUtilExtension
"%WIX_BIN%light.exe" -b ..\..\NativeMessagingHost\bin\Release\netcoreapp2.1\win-x86\publish -out platform-bridge-demo-windows.msi installer.wixobj out.wixobj -ext WixUtilExtension
