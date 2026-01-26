import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserTypeSelectionScreen() {
  const router = useRouter();

  const handleSelectType = (type: 'patient' | 'professional') => {
    // Navigate to respective registration or login flow
    // For now, we can just log or navigate back/forward
    console.log('Selected:', type);
    // router.push('/(auth)/register?type=' + type); 
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-10">
        <View className="items-center mb-12">
          {/* Brand/Logo Placeholder */}
          <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justifyContent-center mb-6 shadow-lg shadow-blue-600/30">
            <Ionicons name="medical" size={32} color="white" />
          </View>
          
          <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">
            Bem-vindo(a)
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center max-w-xs">
            Escolha como você deseja utilizar a plataforma para começarmos.
          </Text>
        </View>

        <View className="space-y-4 w-full max-w-sm mx-auto">
          {/* Patient Option */}
          <TouchableOpacity 
            activeOpacity={0.85}
            onPress={() => handleSelectType('patient')}
            className="flex-row items-center p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:bg-gray-50"
          >
            <View className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-full items-center justify-center mr-4">
              <FontAwesome5 name="user-injured" size={20} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Sou Paciente
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Busco atendimento e consultas
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>

          {/* Professional Option */}
          <TouchableOpacity 
            activeOpacity={0.85}
            onPress={() => handleSelectType('professional')}
            className="flex-row items-center p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm"
          >
            <View className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-full items-center justify-center mr-4">
              <FontAwesome5 name="user-md" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Sou Profissional
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Quero atender pacientes
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View className="mt-12 items-center">
          <Text className="text-gray-400 dark:text-gray-500 text-sm">
            Já possui uma conta? <Text className="text-blue-600 font-semibold" onPress={() => router.back()}>Fazer Login</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
