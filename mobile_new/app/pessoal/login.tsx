import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../../global.css";

import { mockData } from '../../data/mockData';

export default function LoginPassageiro() {
  const router = useRouter();
  const [email, setEmail] = useState('joao@email.com'); // Pre-fill for demo
  const [password, setPassword] = useState('123'); // Pre-fill for demo
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockData.usuarioLogado;

    if (email === user.email && password === user.senha) {
      router.replace("/corridas/procurar" as any); // Ir direto para busca de caronas
    } else {
      alert("Credenciais inválidas! Tente joao@email.com / 123");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-4 z-10 bg-white/80 p-2 rounded-full"
        >
          <Feather name="arrow-left" size={24} color="#004d2b" />
        </TouchableOpacity>

        {/* Header Image */}
        <View className="h-72 w-full relative">
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1565514020176-6c2235c8e8b0?q=80&w=1000&auto=format&fit=crop" }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-[#004d2b]/60" />
          <View className="absolute bottom-8 left-6">
            <Text className="text-white text-3xl font-bold">Bem-vindo(a)</Text>
            <Text className="text-white/80 text-lg">Faça login para continuar</Text>
          </View>
        </View>

        {/* Form */}
        <View className="flex-1 bg-white -mt-6 rounded-t-3xl px-6 pt-8">
          <View className="space-y-4 gap-4">
            <View>
              <Text className="text-gray-600 mb-2 font-medium">E-mail ou Telefone</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:border-[#004d2b] focus:bg-white">
                <Feather name="mail" size={20} color="#9ca3af" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-600 mb-2 font-medium">Senha</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:border-[#004d2b] focus:bg-white">
                <Feather name="lock" size={20} color="#9ca3af" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="********"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="self-end" onPress={() => router.push("/resetar-senha" as any)}>
              <Text className="text-[#004d2b] font-semibold">Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#004d2b] py-4 rounded-xl shadow-lg shadow-green-900/20 flex-row justify-center items-center"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <View className="mr-2">
                  {/* Import ActivityIndicator first if needed, but for now simple text or specific component */}
                  <Text className="text-white font-bold">Carregando...</Text>
                </View>
              ) : null}
              <Text className="text-white text-center font-bold text-lg">Entrar</Text>
            </TouchableOpacity>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-500">Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => router.push("/escolha-usuario" as any)}>
                <Text className="text-[#004d2b] font-bold">Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
