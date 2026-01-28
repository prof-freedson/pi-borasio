import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import "../../../global.css";

export default function LoginMotorista() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    // Validação simples
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      const errMsg = 'E-mail inválido';
      setError(errMsg);
      setIsLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      const errMsg = 'A senha deve ter pelo menos 6 caracteres';
      setError(errMsg);
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular login bem sucedido
      // Em uma app real, usaríamos AsyncStorage ou um Context
      console.log('Login successful', { email });
      
      router.push('/transito-inteligente'); // Redirecionar para uma área logada ou home
    } catch (err) {
      setError('Ocorreu um erro ao fazer login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerClassName="flex-grow justify-center bg-green-100 p-6">
        <View className="bg-green-50 p-6 rounded-xl shadow-sm w-full max-w-md self-center">
            
            <View className="items-center mb-8">
                <View className="bg-green-800 p-4 rounded-full mb-4">
                    <Feather name="truck" size={32} color="white" />
                </View>
                <Text className="text-3xl font-bold text-green-800 text-center">
                    Entrar como Motorista
                </Text>
            </View>

            {error ? (
            <View className="mb-4 p-3 bg-red-100 rounded border border-red-200">
                <Text className="text-red-700 text-sm text-center font-medium">{error}</Text>
            </View>
            ) : null}

            <View className="space-y-4 gap-4">
                <View>
                    <Text className="text-green-800 mb-1 font-medium">E-mail</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="seu@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="w-full border border-green-300 bg-white p-3 rounded-lg text-gray-800"
                    />
                </View>

                <View>
                    <Text className="text-green-800 mb-1 font-medium">Senha</Text>
                    <View className="relative">
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            placeholder="Sua senha"
                            className="w-full border border-green-300 bg-white p-3 rounded-lg text-gray-800 pr-12"
                        />
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3"
                        >
                            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#6b7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`w-full bg-green-800 py-4 rounded-lg items-center mt-2 ${isLoading ? 'opacity-70' : ''}`}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-bold text-lg">Login</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View className="items-center mt-6 gap-4">
                <View className="flex-row">
                    <Text className="text-green-900 text-sm">Esqueceu a senha? </Text>
                    <TouchableOpacity onPress={() => console.log('Recover password')}>
                         <Text className="text-green-700 font-bold text-sm underline">Recupere já!</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row">
                    <Text className="text-green-900 text-sm">Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => console.log('Navigate to register')}>
                        <Text className="text-green-700 font-bold text-sm underline">Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </ScrollView>
  );
}
