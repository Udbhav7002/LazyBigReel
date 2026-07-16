# LazyBigReel

A sleek, local network application that lets you use your phone as a trackpad to scroll through Instagram Reels, YouTube Shorts, or TikTok on your Mac. Designed with a clean Apple-inspired dark mode aesthetic and full haptic feedback.

## Features
- **Seamless Local Connection**: Uses websockets over your local Wi-Fi to send swipe events with zero latency.
- **Native Haptics**: Feel the scroll! Light haptics for scrolling up (next reel) and heavy haptics for scrolling down (previous reel).
- **Pitch Black Mode**: Once connected, the phone UI goes completely dark to save battery while you swipe.
- **Automated Startup**: One-click startup script that launches the background server and the mobile Expo QR code instantly.

## Setup Instructions

### Prerequisites
1. **Node.js**: Make sure you have Node.js installed on your Mac.
2. **Expo Go**: Download the "Expo Go" app from the iOS App Store or Google Play Store on your phone.

### Installation
1. Clone the repository to your Mac:
   ```bash
   git clone https://github.com/Udbhav7002/LazyBigReel.git
   cd LazyBigReel
   ```
2. Install dependencies for the Mac server:
   ```bash
   cd mac-app
   npm install
   ```
3. Install dependencies for the Mobile app:
   ```bash
   cd ../phone-app
   npm install
   ```

## How to Run
1. Open the `LazyBigReel` folder in your Mac's Finder.
2. Double-click the **`Start_LazyBigReel.command`** script.
3. This will launch a terminal showing a QR code.
4. Open the **Expo Go** app on your phone, tap **Scan QR Code**, and scan it.
5. In the app on your phone, enter your Mac's local IP address (which is shown in the terminal, e.g., `192.168.1.5`) and tap **Connect**.
6. Start swiping up and down on your phone to scroll on your Mac!

## Notes
- *Accessibility Permissions*: Your Mac must allow your Terminal application to simulate keyboard presses. If swiping on your phone doesn't scroll your Mac, go to **System Settings > Privacy & Security > Accessibility** and ensure your Terminal app is toggled ON.
- *iOS Safari Limitation*: If you try to run the phone interface in Safari (instead of Expo Go), iOS currently does not support the web vibration API. Use Expo Go for the best haptic experience!
