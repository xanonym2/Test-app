import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compteur</Text>

      <Text style={styles.count}>{count}</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => setCount((value) => value + 1)}
      >
        <Text style={styles.buttonLabel}>Incrémenter</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
  },
  count: {
    fontSize: 72,
    fontWeight: '300',
    color: '#111',
    fontVariant: ['tabular-nums'],
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonPressed: {
    backgroundColor: '#1d4ed8',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
