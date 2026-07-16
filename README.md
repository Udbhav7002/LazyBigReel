<div align="center">

# 📱 LazyBigReel

**Turn your phone into a sleek, zero-latency trackpad to endlessly scroll Reels & Shorts on your Mac.**

[![Made with Node.js](https://img.shields.io/badge/Node.js-100000?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Built with Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)](#)
[![Apple Inspired](https://img.shields.io/badge/UI-Apple_Inspired-000000?style=for-the-badge&logo=apple&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#)

</div>

---

### 🥱 Too lazy to sit up and scroll? We've got you covered.
**LazyBigReel** bridges your Mac and your smartphone over your local Wi-Fi network, allowing you to lay back and swipe on your phone while the reels scroll seamlessly on your big screen.

No lag. No clunky interfaces. Just pure, uninterrupted doom-scrolling. 

---

## ✨ Features

- ⚡️ **Zero-Latency WebSockets:** Powered by `Socket.io`, your swipes are registered on your Mac in milliseconds.
- 📳 **Native Haptics:** Feel the scroll! 
  - 👆 *Swipe Up (Next Reel):* Crisp, light double-tap haptics.
  - 👇 *Swipe Down (Prev Reel):* Heavy, satisfying thud haptic.
- 🌙 **Pitch Black Mode:** Once connected, the phone UI goes completely pitch-black. It saves your battery and keeps the room dark while you watch the big screen.
- 🚀 **1-Click Startup:** A custom double-clickable `.command` script launches the invisible background server and your Expo QR code instantly.

---

## 🛠 Setup & Installation

### Prerequisites
1. **[Node.js](https://nodejs.org/en/)** installed on your Mac.
2. The **Expo Go** app installed on your iPhone or Android.

### 1. Clone the Repo
```bash
git clone https://github.com/Udbhav7002/LazyBigReel.git
cd LazyBigReel
```

### 2. Install Dependencies
You need to install the packages for both the Mac server and the Phone app:
```bash
# Install Mac Server dependencies
cd mac-app && npm install

# Install Phone App dependencies
cd ../phone-app && npm install
```

---

## 🎮 How to Use (The Lazy Way)

We built this for maximum laziness. Once installed, you never have to touch a terminal again.

1. Open the `LazyBigReel` folder in your Mac's Finder.
2. Double-click the **`Start_LazyBigReel.command`** file.
3. A terminal will open with a massive **QR code**.
4. Open **Expo Go** on your phone and scan the QR code.
5. In the app, type your Mac's IP address (shown in your terminal, e.g., `192.168.1.5`) and smash **Connect**.
6. **Lay back and start swiping.**

---

## ⚠️ Important Notes

- **Accessibility Permissions:** Your Mac must allow your Terminal application to simulate keyboard presses! If swiping on your phone doesn't scroll your Mac, go to **System Settings > Privacy & Security > Accessibility** and ensure your Terminal app (or IDE) is toggled ON.
- **Why Expo Go?** If you try to run the phone interface in a standard mobile web browser (like Safari), Apple blocks the vibration API. We use React Native & Expo Go to guarantee you get those sweet, sweet haptics.

---

<div align="center">
  <i>Built for the ultimate couch potatoes. 🥔</i>
</div>
