import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { mockData } from '../../../data/mockData';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'driver';
    time: string;
};

export default function ChatMotoristaScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Olá! Já estou a caminho.', sender: 'driver', time: 'Agora' }
    ]);

    const carona = mockData.ofertasCaronas.find(c => c.id === Number(id));
    const motorista = mockData.motoristas.find(m => m.id === carona?.motoristaId);
    const nomeMotorista = motorista ? motorista.nome : "Motorista";

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: message,
                sender: 'user',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, newMessage]);
            setMessage('');

            // Simular resposta
            setTimeout(() => {
                const response: Message = {
                    id: (Date.now() + 1).toString(),
                    text: 'Ok! Chego em breve.',
                    sender: 'driver',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, response]);
            }, 2000);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-green-50">
            {/* Header */}
            <View className="bg-[#004d2b] px-6 pt-12 pb-6 border-b border-green-800 shadow-sm rounded-b-[32px] z-10 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft color="#fff" size={24} />
                </TouchableOpacity>
                <View>
                    <Text className="text-white text-lg font-bold">Chat com {nomeMotorista}</Text>
                    <Text className="text-green-200 text-xs">Motorista</Text>
                </View>
            </View>

            {/* Lista de Mensagens */}
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                className="flex-1 px-4 pt-4"
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View className={`mb-4 max-w-[80%] p-4 rounded-2xl ${item.sender === 'user'
                        ? 'bg-[#004d2b] self-end rounded-tr-none'
                        : 'bg-white self-start rounded-tl-none border border-gray-200'
                        }`}>
                        <Text className={`text-base ${item.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                            {item.text}
                        </Text>
                        <Text className={`text-[10px] mt-1 text-right ${item.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                            {item.time}
                        </Text>
                    </View>
                )}
            />

            {/* Input */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
            >
                <View className="p-4 bg-white border-t border-gray-100 flex-row items-center pb-8">
                    <TextInput
                        className="flex-1 bg-gray-100 p-4 rounded-2xl mr-3 text-gray-800"
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChangeText={setMessage}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        className="bg-yellow-400 p-4 rounded-2xl shadow-sm items-center justify-center"
                    >
                        <Send color="#004d2b" size={24} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
