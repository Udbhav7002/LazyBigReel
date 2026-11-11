# LazyBigReel

[![CI](https://github.com/Udbhav7002/LazyBigReel/actions/workflows/ci.yml/badge.svg)](https://github.com/Udbhav7002/LazyBigReel/actions/workflows/ci.yml)

Use your phone as a trackpad for scrolling Reels and Shorts on your Mac. The
phone connects to a small server on your Mac over the local network, and
swipes on the phone are simulated as arrow-key presses, so you can scroll
from across the room.

## How it works

- The Mac runs a Node server (Express + Socket.IO). It receives swipe events
  and simulates key presses with nut-js: swipe up presses Down (next reel),
  swipe down presses Up (previous reel).
- The phone runs an Expo (React Native) app. Swipe up gives a light
  double-tap haptic, swipe down a heavy one, so you can tell the direction
  without looking.
- Once connected, the phone screen goes black so it doesn't light up the
  room, and the app keeps the phone awake.
- `Start_LazyBigReel.command` starts the Mac server in the background and
  launches the Expo dev server with a QR code, so after installing you
  never have to open a terminal again.

## Setup

Prerequisites: [Node.js](https://nodejs.org/) on your Mac, and the Expo Go
app on your iPhone or Android phone.

1. Clone the repo:

   ```bash
   git clone https://github.com/Udbhav7002/LazyBigReel.git
   cd LazyBigReel
   ```

2. Install dependencies for both apps:

   ```bash
   # Mac server
   cd mac-app && npm install

   # Phone app
   cd ../phone-app && npm install
   ```

## Usage

1. Double-click `Start_LazyBigReel.command` in Finder. A terminal opens
   with a QR code.
2. Open Expo Go on your phone and scan the QR code.
3. In the app, type your Mac's IP address (printed in the terminal, e.g.
   `192.168.1.5`) and tap Connect.
4. Swipe: up for the next reel, down for the previous one.

The Mac server also prints a localtunnel HTTPS URL, which you can use when
the phone is not on the same network.

## Notes

- Accessibility permissions: the Mac has to allow your terminal to simulate
  keyboard presses. If swiping doesn't scroll the Mac, go to System
  Settings > Privacy & Security > Accessibility and enable your terminal
  app (or IDE).
- Why Expo Go: in a normal mobile browser, iOS blocks the vibration API, so
  the haptics would not work. The remote is a native app instead.

## License

MIT — see [LICENSE](LICENSE).
