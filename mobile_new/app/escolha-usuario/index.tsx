import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../../global.css";

export default function UserTypeSelectionScreen() {
  const router = useRouter();

  const handleSelectType = (type: 'passageiro' | 'motorista') => {
    if (type === 'motorista') {
      router.push('/pessoalmotorista/cadastro-motorista');
    } else {
      router.push('/pessoal/cadastro' as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#dcfce7]">
      <Stack.Screen options={{
        headerShown: true,
        title: "Cadastrar",
        headerStyle: { backgroundColor: '#064e3b' },
        headerTintColor: '#fff',
      }} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-10">
        <View className="items-center mb-12">
          <View className="bg-[#064e3b] w-20 h-20 rounded-3xl items-center justify-center mb-6 shadow-xl shadow-green-900/30">
            <Ionicons name="car-sport" size={40} color="white" />
          </View>

          <Text className="text-3xl font-black text-[#064e3b] text-center mb-3">
            Como você quer usar o Borasiô?
          </Text>
          <Text className="text-base text-gray-500 text-center max-w-xs font-medium">
            Escolha seu perfil para uma experiência personalizada na ilha.
          </Text>
        </View>

        <View className="space-y-4 gap-4 w-full max-w-sm mx-auto">
          {/* Passenger Option */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleSelectType('passageiro')}
            className="flex-row items-center p-6 bg-white rounded-3xl border border-green-50 shadow-sm"
          >
            <View className="w-14 h-14 bg-green-50 rounded-2xl items-center justify-center mr-4">
              <Feather name="users" size={24} color="#059669" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-black text-green-900 mb-1">
                Sou Passageiro
              </Text>
              <Text className="text-xs text-gray-500 font-medium">
                Quero caronas rápidas e baratas
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#d1d5db" />
          </TouchableOpacity>

          {/* Driver Option */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleSelectType('motorista')}
            className="flex-row items-center p-6 bg-white rounded-3xl border border-green-50 shadow-sm"
          >
            <View className="w-14 h-14 bg-yellow-50 rounded-2xl items-center justify-center mr-4">
              <Feather name="truck" size={24} color="#b45309" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-black text-green-900 mb-1">
                Sou Motorista
              </Text>
              <Text className="text-xs text-gray-500 font-medium">
                Quero oferecer caronas e ganhar
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#d1d5db" />
          </TouchableOpacity>
        </View>

        <View className="mt-16 items-center">
          <Text className="text-gray-400 text-sm font-medium">
            Já possui uma conta? <Text className="text-[#064e3b] font-black underline" onPress={() => router.push('/pessoal/login')}>Fazer Login</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
