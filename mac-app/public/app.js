const socket = io();

const uiContainer = document.getElementById('ui-container');
const connectBtn = document.getElementById('connect-btn');
const statusText = document.getElementById('status-text');
const touchpadOverlay = document.getElementById('touchpad-overlay');

let isConnected = false;
let wakeLock = null;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Handle Connect Button Click
connectBtn.addEventListener('click', () => {
    socket.emit('request_connect');
});

// Server confirmed connection
socket.on('connection_established', async () => {
    isConnected = true;
    connectBtn.classList.add('connected');
    connectBtn.textContent = 'Connected';
    statusText.textContent = 'Devices synced!';

    // Wait a brief moment then transition
    setTimeout(() => {
        if (isMobile) {
            enablePhoneMode();
        } else {
            enableMacMode();
        }
    }, 1000);
});

// Server reported connection lost
socket.on('connection_lost', () => {
    isConnected = false;
    connectBtn.classList.remove('connected');
    connectBtn.textContent = 'Connect';
    statusText.textContent = 'Connection lost. Waiting...';
    
    // Reset UI
    uiContainer.classList.remove('hidden');
    touchpadOverlay.style.display = 'none';
    if (wakeLock) {
        wakeLock.release().then(() => wakeLock = null);
    }
});

async function enablePhoneMode() {
    uiContainer.classList.add('hidden');
    touchpadOverlay.style.display = 'flex';
    
    // Request WakeLock to keep screen on
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.error('WakeLock API failed:', err);
    }
}

function enableMacMode() {
    uiContainer.classList.add('hidden');
    // On Mac, we just hide the UI so they can focus on reels
}

// Swipe detection logic for the phone
let touchStartY = 0;
let touchEndY = 0;

touchpadOverlay.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

touchpadOverlay.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance to be considered a swipe
    if (touchStartY - touchEndY > swipeThreshold) {
        // Swipe UP
        socket.emit('swipe', 'up');
        triggerHaptic('up');
    } else if (touchEndY - touchStartY > swipeThreshold) {
        // Swipe DOWN
        socket.emit('swipe', 'down');
        triggerHaptic('down');
    }
}

function triggerHaptic(direction) {
    if ('vibrate' in navigator) {
        if (direction === 'up') {
            // Swipe Up pattern: e.g., short, short, long (feeling of going up)
            navigator.vibrate([30, 50, 80]);
        } else {
            // Swipe Down pattern: e.g., long, short, short (feeling of going down)
            navigator.vibrate([80, 50, 30]);
        }
    }
}
