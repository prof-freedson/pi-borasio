import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
