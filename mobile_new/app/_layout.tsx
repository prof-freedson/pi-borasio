import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Bem-vindo ao Borasio</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="escolha-usuario/index" />
        <Stack.Screen name="usuario/index" />
        <Stack.Screen name="pessoal/login" />
        <Stack.Screen name="pagamento/index" />
        <Stack.Screen name="transito-inteligente/index" />
        <Stack.Screen name="desvios-inteligentes/index" />
        <Stack.Screen name="pessoalmotorista/loginmotorista/index" />
        <Stack.Screen name="pessoalmotorista/cadastro-motorista/index" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Adapted color for mobile
  },
  splashText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
