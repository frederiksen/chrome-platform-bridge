# Chrome Platform Bridge
## macOS screenshot
![Demo](https://raw.githubusercontent.com/frederiksen/chrome-platform-bridge/master/documentation/macOS.png "Demo")

## Windows system setup
![Demo](https://raw.githubusercontent.com/frederiksen/chrome-platform-bridge/master/documentation/Windows.gif "Demo")

## Linux screenshot
![Demo](https://raw.githubusercontent.com/frederiksen/chrome-platform-bridge/master/documentation/Linux.png "Demo")

## What is this project about?
This project demonstrates a bridge from JavaScript to the platform hosting the browser.

## What can it be used for?
The bridging functionallity can be used to mix a typically web-app and local resources. The resources could be: the file system, a hardware device or some legacy software.

## Live demo
https://frederiksen.github.io/chrome-platform-bridge/index.html

## Project goals and objectives
* Use modern technologies
* Cross-platform - this project targes Windows, macOS and Linux
* Ease-of-use - non-nerds must be able to setup a running system within minutes
* [Keep it simple, Stupid](https://en.wikipedia.org/wiki/KISS_principle)

## Technology stack
* [Native Messaging](https://developer.chrome.com/apps/nativeMessaging)
* [.NET Core](https://github.com/dotnet/core)

### Layered architecture
![Layered architecture](https://raw.githubusercontent.com/frederiksen/chrome-platform-bridge/master/documentation/Architecture.svg?sanitize=true "Layered architecture")
