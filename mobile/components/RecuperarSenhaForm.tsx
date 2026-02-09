import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  // Add other routes here if needed
};

export default function RecuperarSenhaForm() {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSubmitEmail = async () => {
    setCarregando(true);
    try {
      const res = await fetch('http://localhost:8080/api/password-recovery/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        Alert.alert('Sucesso', 'E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      } else {
        const data = await res.text();
        Alert.alert('Erro', data);
      }
    } catch {
      Alert.alert('Erro', 'Erro ao solicitar recuperação. Tente novamente.');
    }
    setCarregando(false);
  };

  return (
    <View style={tw`flex-1 bg-green-100 justify-center items-center p-4`}>
      <View style={tw`bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-md`}>
        <Text style={tw`text-3xl font-bold mb-6 text-green-800 text-center`}>
          Recuperar Senha
        </Text>

        <View style={tw`mb-4`}>
          <Text style={tw`text-green-800 mb-1`}>E-mail</Text>
          <TextInput
            style={tw`w-full border border-green-300 p-3 rounded bg-white`}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={tw`bg-green-800 py-3 px-4 rounded ${carregando ? 'opacity-70' : ''}`}
          onPress={handleSubmitEmail}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white text-center font-bold`}>Enviar</Text>
          )}
        </TouchableOpacity>

        <Text style={tw`text-center text-sm text-green-900 mt-4`}>
          Lembrou sua senha?{' '}
          <Text
            style={tw`text-green-700 font-medium underline`}
            onPress={() => navigation.navigate('Login')}
          >
            Fazer login
          </Text>
        </Text>
      </View>
    </View>
  );
}