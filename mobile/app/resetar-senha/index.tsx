import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        if (!email) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
            <Stack.Screen options={{
                headerShown: false,
            }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                    <View className="py-6">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={24} color={Platform.OS === 'ios' ? '#000' : '#333'} />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-1 justify-center max-w-sm mx-auto w-full pb-20">
                        <View className="mb-8">
                            <View className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl items-center justify-center mb-6">
                                <MaterialIcons name="lock-reset" size={32} color="#4F46E5" />
                            </View>
                            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                Resetar Senha
                            </Text>
                            <Text className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                Não se preocupe! Insira o e-mail associado à sua conta e enviaremos instruções para redefinição.
                            </Text>
                        </View>

                        {isSuccess ? (
                            <View className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 items-center">
                                <Ionicons name="checkmark-circle" size={48} color="#10B981" />
                                <Text className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mt-4 text-center">
                                    Email Enviado!
                                </Text>
                                <Text className="text-emerald-700 dark:text-emerald-400 text-center mt-2 leading-relaxed">
                                    Verifique sua caixa de entrada para continuar o processo de recuperação.
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    className="mt-6 bg-emerald-600 px-8 py-3 rounded-xl w-full"
                                >
                                    <Text className="text-white font-semibold text-center">Voltar ao Login</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="space-y-6">
                                <View>
                                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                        E-mail
                                    </Text>
                                    <View className="flex-row items-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all">
                                        <MaterialIcons name="email" size={20} color="#94A3B8" className="mr-3" />
                                        <TextInput
                                            className="flex-1 text-gray-900 dark:text-white text-base ml-3"
                                            placeholder="seu@email.com"
                                            placeholderTextColor="#9CA3AF"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={!email || isSubmitting}
                                    className={`py-4 rounded-xl shadow-lg shadow-indigo-500/20 flex-row justify-center items-center space-x-2 ${!email || isSubmitting ? 'bg-indigo-300 dark:bg-indigo-800' : 'bg-indigo-600'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <Text className="text-white font-bold text-lg">Enviando...</Text>
                                    ) : (
                                        <Text className="text-white font-bold text-lg">Enviar Link</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
