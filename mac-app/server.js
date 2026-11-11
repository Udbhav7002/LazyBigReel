const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { keyboard, Key } = require('@nut-tree-fork/nut-js');
const localtunnel = require('localtunnel');
const path = require('path');
const os = require('os');
const EventEmitter = require('events');

class AppEvents extends EventEmitter {}
const appEvents = new AppEvents();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const clients = new Set();
let isConnected = false;

io.on('connection', (socket) => {
    clients.add(socket.id);
    console.log('Client connected:', socket.id, 'Total clients:', clients.size);

    socket.on('request_connect', () => {
        isConnected = true;
        io.emit('connection_established');
        appEvents.emit('connected');
    });

    socket.on('swipe', async (direction) => {
        if (!isConnected) return;
        
        try {
            if (direction === 'up') {
                console.log('Swipe Up received - Pressing Down Arrow (Next Reel)');
                await keyboard.pressKey(Key.Down);
                await keyboard.releaseKey(Key.Down);
            } else if (direction === 'down') {
                console.log('Swipe Down received - Pressing Up Arrow (Previous Reel)');
                await keyboard.pressKey(Key.Up);
                await keyboard.releaseKey(Key.Up);
            }
        } catch (error) {
            console.error('Error simulating keyboard event:', error);
        }
    });

    socket.on('disconnect', () => {
        clients.delete(socket.id);
        console.log('Client disconnected:', socket.id);
        if (clients.size === 0) {
            isConnected = false;
            io.emit('connection_lost');
            appEvents.emit('disconnected');
        }
    });
});

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

server.listen(PORT, async () => {
    const localIp = getLocalIp();
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Access on your local network: http://${localIp}:${PORT}`);

    try {
        const tunnel = await localtunnel({ port: PORT });
        console.log(`\n======================================================`);
        console.log(`📱 HTTPS Link for Phone:`);
        console.log(`👉 ${tunnel.url}`);
        console.log(`======================================================\n`);
        
        tunnel.on('close', () => {
            console.log('Localtunnel closed');
        });
    } catch (err) {
        console.error('Failed to create localtunnel:', err.message);
    }
});

module.exports = { appEvents };
