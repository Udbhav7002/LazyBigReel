import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, PanResponder, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import io from 'socket.io-client';
import * as Haptics from 'expo-haptics';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  useKeepAwake();

  const [ipAddress, setIpAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const connectToServer = () => {
    if (!ipAddress) return;
    
    let url = ipAddress;
    if (!url.startsWith('http')) {
      url = `http://${url}:3000`;
    }

    const newSocket = io(url);
    
    newSocket.on('connect', () => {
      newSocket.emit('request_connect');
    });

    newSocket.on('connection_established', () => {
      setIsConnected(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });

    newSocket.on('connection_lost', () => {
      setIsConnected(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    });

    newSocket.on('connect_error', () => {
      setIsConnected(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    });

    socketRef.current = newSocket;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        
        if (dy < -50) {
          // Swipe Up -> Next Reel -> Light haptic going up
          socketRef.current?.emit('swipe', 'up');
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 100);
        } else if (dy > 50) {
          // Swipe Down -> Prev Reel -> Heavy haptic going down
          socketRef.current?.emit('swipe', 'down');
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
      },
    })
  ).current;

  if (isConnected) {
    return (
      <View style={styles.blackScreen} {...panResponder.panHandlers}>
        <Text style={styles.hiddenText}>Swipe Up or Down</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.uiContainer}>
        <Text style={styles.title}>Lazy Reels</Text>
        <Text style={styles.subtitle}>Enter Mac IP Address to connect</Text>
        
        <TextInput
          style={styles.input}
          placeholder="e.g. 192.168.1.5"
          placeholderTextColor="#8e8e93"
          value={ipAddress}
          onChangeText={setIpAddress}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
        />

        <TouchableOpacity style={styles.button} onPress={connectToServer}>
          <Text style={styles.buttonText}>Connect to Mac</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiContainer: {
    backgroundColor: 'rgba(28, 28, 30, 0.7)',
    borderRadius: 20,
    padding: 40,
    width: '85%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a3c',
  },
  button: {
    backgroundColor: '#0a84ff',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  blackScreen: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenText: {
    color: 'rgba(255, 255, 255, 0.1)',
    fontSize: 16,
  }
});
