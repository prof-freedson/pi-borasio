import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons, Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactScreen() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
            <Stack.Screen options={{
                title: 'Fale Conosco',
                headerBackTitle: 'Voltar',
                headerTintColor: '#334155',
                headerStyle: { backgroundColor: '#F8FAFC' },
                headerShadowVisible: false,
            }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

                    {/* Header Section */}
                    <View className="py-8">
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            Como podemos ajudar?
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                            Tem alguma dúvida, sugestão ou problema? Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View className="space-y-5 pb-10">
                        {/* Name Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Nome Completo</Text>
                            <View className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 flex-row items-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                <Feather name="user" size={20} color="#94A3B8" />
                                <TextInput
                                    className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
                                    placeholder="Seu nome"
                                    placeholderTextColor="#9CA3AF"
                                    value={form.name}
                                    onChangeText={(t) => handleChange('name', t)}
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">E-mail</Text>
                            <View className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 flex-row items-center">
                                <Feather name="mail" size={20} color="#94A3B8" />
                                <TextInput
                                    className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
                                    placeholder="seu@email.com"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={form.email}
                                    onChangeText={(t) => handleChange('email', t)}
                                />
                            </View>
                        </View>

                        {/* Subject Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Assunto</Text>
                            <View className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 flex-row items-center">
                                <Feather name="tag" size={20} color="#94A3B8" />
                                <TextInput
                                    className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
                                    placeholder="Sobre o que quer falar?"
                                    placeholderTextColor="#9CA3AF"
                                    value={form.subject}
                                    onChangeText={(t) => handleChange('subject', t)}
                                />
                            </View>
                        </View>

                        {/* Message Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Mensagem</Text>
                            <View className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 items-start min-h-[120px]">
                                <Feather name="message-square" size={20} color="#94A3B8" style={{ marginTop: 3 }} />
                                <TextInput
                                    className="flex-1 ml-3 text-base text-gray-900 dark:text-white leading-5"
                                    placeholder="Digite sua mensagem aqui..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    textAlignVertical="top"
                                    value={form.message}
                                    onChangeText={(t) => handleChange('message', t)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            className="bg-blue-600 rounded-xl py-4 shadow-lg shadow-blue-600/25 mt-4 items-center flex-row justify-center space-x-2"
                            activeOpacity={0.9}
                        >
                            <Text className="text-white font-bold text-lg">Enviar Mensagem</Text>
                            <Ionicons name="send" size={20} color="white" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Contact Info Footer */}
                    <View className="border-t border-gray-200 dark:border-slate-800 py-8 mb-4">
                        <Text className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-4">Outros meios de contato</Text>

                        <View className="space-y-4">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-4">
                                    <FontAwesome5 name="whatsapp" size={20} color="#10B981" />
                                </View>
                                <View>
                                    <Text className="font-semibold text-gray-900 dark:text-white">WhatsApp</Text>
                                    <Text className="text-gray-500 text-sm">(11) 99999-9999</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-4">
                                    <Feather name="phone" size={20} color="#3B82F6" />
                                </View>
                                <View>
                                    <Text className="font-semibold text-gray-900 dark:text-white">Telefone</Text>
                                    <Text className="text-gray-500 text-sm">0800 123 4567</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


