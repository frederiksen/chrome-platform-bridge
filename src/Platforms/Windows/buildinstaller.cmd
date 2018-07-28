set WIX_BIN=c:\Program Files (x86)\WiX Toolset v3.11\bin\
"%WIX_BIN%heat.exe" dir ..\..\NativeMessagingHost\bin\Release\netcoreapp2.1\win-x86\publish -o out.wxs -cg NativeMessagingHostGroup -srd -sfrag -gg -g1 -dr INSTALLFOLDER
"%WIX_BIN%candle.exe" out.wxs
"%WIX_BIN%candle.exe" installer.wxs -ext WixUtilExtension
"%WIX_BIN%light.exe" -b ..\..\NativeMessagingHost\bin\Release\netcoreapp2.1\win-x86\publish -out platform-bridge-demo-windows.msi installer.wixobj out.wixobj -ext WixUIExtension -ext WixUtilExtension