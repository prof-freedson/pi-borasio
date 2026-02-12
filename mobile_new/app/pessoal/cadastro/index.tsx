import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import "../../../global.css";

export default function Cadastro() {
    const router = useRouter();
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [termosAceitos, setTermosAceitos] = useState(false);

    // Formatação de entrada (CPF e Telefone)
    const formatInput = (name: string, value: string) => {
        let valorFormatado = value;

        if (name === 'telefone') {
            const numeros = value.replace(/\D/g, '').slice(0, 11);
            if (numeros.length > 2) {
                valorFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}`;
                if (numeros.length > 7) {
                    valorFormatado += `-${numeros.slice(7)}`;
                }
            } else {
                valorFormatado = numeros;
            }
        } else if (name === 'cpf') {
            const numeros = value.replace(/\D/g, '').slice(0, 11);
            valorFormatado = numeros
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        setForm({ ...form, [name]: valorFormatado });
    };

    const validate = () => {
        if (!form.nome || !/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) return "Nome completo inválido.";
        if (!form.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) return "CPF incompleto ou inválido.";
        if (!form.endereco) return "O endereço é obrigatório.";
        if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return "E-mail inválido.";
        if (!form.telefone || !/^\(\d{2}\) \d{5}-\d{4}$/.test(form.telefone)) return "Telefone incompleto.";
        if (!form.senha || !validarForcaSenha(form.senha).todosValidos) return "Senha não atende aos requisitos.";
        if (form.senha !== form.confirmarSenha) return "As senhas não coincidem.";
        if (!termosAceitos) return "Você precisa aceitar os termos.";
        return null;
    };

    const validarForcaSenha = (senha: string) => {
        const requisitos = {
            minimo: /.{8,}/.test(senha),
            maiuscula: /[A-Z]/.test(senha),
            minuscula: /[a-z]/.test(senha),
            numero: /[0-9]/.test(senha),
            especial: /[^A-Za-z0-9]/.test(senha),
        };
        const todosValidos = Object.values(requisitos).every(Boolean);
        return { ...requisitos, todosValidos };
    };

    const forcaSenha = validarForcaSenha(form.senha);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            Alert.alert("Erro", validationError);
            setIsLoading(false);
            return;
        }

        try {
            // Remove caracteres não numéricos de CPF e Telefone antes de enviar
            const payload = {
                ...form,
                cpf: form.cpf.replace(/\D/g, ''),
                telefone: form.telefone.replace(/\D/g, ''),
            };

            const response = await fetch("https://backend-node-vd88.vercel.app/auth/register/passageiro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro desconhecido ao cadastrar.");
            }

            Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                { text: "OK", onPress: () => router.push("/usuario" as any) }
            ]);

        } catch (err: any) {
            setError(err.message || "Erro ao conectar com o servidor.");
            Alert.alert("Erro", err.message || "Erro ao conectar com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-green-50"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="pt-12 pb-6 px-6 bg-white rounded-b-[40px] shadow-sm mb-6 relative overflow-hidden">
                    <View className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50" />

                    <TouchableOpacity onPress={() => router.back()} className="mb-6 self-start bg-gray-50 p-2 rounded-xl">
                        <Feather name="chevron-left" size={24} color="#004d2b" />
                    </TouchableOpacity>

                    <View className="items-center mb-4">
                        <View className="bg-green-100 w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-sm">
                            <Feather name="zap" size={28} color="#004d2b" />
                        </View>
                        <Text className="text-3xl font-black text-[#004d2b] text-center">Crie sua conta</Text>
                        <Text className="text-gray-500 text-center font-medium mt-1">Junte-se à maior rede de caronas</Text>
                    </View>
                </View>

                {/* Form Container */}
                <View className="px-6 space-y-5 gap-5">
                    {/* Campos */}
                    <Input label="Nome Completo" value={form.nome} onChangeText={(t: string) => setForm({ ...form, nome: t })} placeholder="Seu nome" icon="user" />
                    <Input label="CPF" value={form.cpf} onChangeText={(t: string) => formatInput('cpf', t)} maxLength={14} placeholder="000.000.000-00" icon="hash" keyboardType="numeric" />
                    <Input label="E-mail" value={form.email} onChangeText={(t: string) => setForm({ ...form, email: t })} placeholder="seu@email.com" icon="mail" keyboardType="email-address" />
                    <Input label="Telefone" value={form.telefone} onChangeText={(t: string) => formatInput('telefone', t)} maxLength={15} placeholder="(98) 90000-0000" icon="smartphone" keyboardType="phone-pad" />
                    <Input label="Endereço" value={form.endereco} onChangeText={(t: string) => setForm({ ...form, endereco: t })} placeholder="Endereço completo" icon="map-pin" />

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <SenhaInput label="Senha" value={form.senha} onChangeText={(t: string) => setForm({ ...form, senha: t })} isPasswordVisible={mostrarSenha} toggleVisibility={() => setMostrarSenha(!mostrarSenha)} />
                        </View>
                        <View className="flex-1">
                            <SenhaInput label="Confirmar" value={form.confirmarSenha} onChangeText={(t: string) => setForm({ ...form, confirmarSenha: t })} isPasswordVisible={mostrarConfirmarSenha} toggleVisibility={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} />
                        </View>
                    </View>

                    {/* Requisitos de Senha */}
                    {form.senha.length > 0 && (
                        <View className="bg-white p-4 rounded-2xl border border-gray-100 flex-row flex-wrap gap-2">
                            <RequisitoSenha valido={forcaSenha.minimo} texto="8+" />
                            <RequisitoSenha valido={forcaSenha.maiuscula} texto="ABC" />
                            <RequisitoSenha valido={forcaSenha.minuscula} texto="abc" />
                            <RequisitoSenha valido={forcaSenha.numero} texto="123" />
                            <RequisitoSenha valido={forcaSenha.especial} texto="@#$" />
                        </View>
                    )}

                    {/* Termos */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setTermosAceitos(!termosAceitos)}
                        className="flex-row items-center bg-white p-4 rounded-2xl border border-gray-100"
                    >
                        <View className={`w-6 h-6 rounded-lg border-2 mr-3 items-center justify-center ${termosAceitos ? 'bg-[#004d2b] border-[#004d2b]' : 'border-gray-300'}`}>
                            {termosAceitos && <Feather name="check" size={16} color="white" />}
                        </View>
                        <Text className="text-gray-500 text-xs flex-1">
                            Concordo com os <Text className="font-bold text-[#004d2b]">Termos de Serviço</Text> e a <Text className="font-bold text-[#004d2b]">Política de Privacidade</Text>.
                        </Text>
                    </TouchableOpacity>

                    {/* Botão Submit */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={isLoading}
                        className={`py-4 rounded-2xl shadow-lg flex-row justify-center items-center mb-8 ${isLoading
                            ? "bg-gray-200"
                            : "bg-yellow-400 shadow-yellow-400/30"}`}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#004d2b" />
                        ) : (
                            <>
                                <Text className="font-black text-[#004d2b] text-lg mr-2">CRIAR CONTA</Text>
                                <Feather name="arrow-right" size={20} color="#004d2b" />
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/pessoal/login" as any)} className="items-center pb-8">
                        <Text className="text-gray-500">Já tem conta? <Text className="text-[#004d2b] font-bold">Faça Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const Input = ({ label, value, onChangeText, placeholder, icon, ...props }: any) => (
    <View className="space-y-2">
        <Text className="text-xs font-black text-[#004d2b] ml-1 uppercase tracking-wider">{label}</Text>
        <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center focus:border-[#004d2b]">
            <Feather name={icon} size={20} color="#9ca3af" />
            <TextInput
                className="flex-1 ml-3 text-base text-gray-800 font-medium"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#d1d5db"
                {...props}
            />
        </View>
    </View>
);

const SenhaInput = ({ label, value, onChangeText, isPasswordVisible, toggleVisibility }: any) => (
    <View className="space-y-2">
        <Text className="text-xs font-black text-[#004d2b] ml-1 uppercase tracking-wider">{label}</Text>
        <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center">
            <TextInput
                className="flex-1 text-base text-gray-800 font-medium"
                value={value}
                onChangeText={onChangeText}
                placeholder="••••••"
                placeholderTextColor="#d1d5db"
                secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={toggleVisibility}>
                <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={20} color="#9ca3af" />
            </TouchableOpacity>
        </View>
    </View>
);

const RequisitoSenha = ({ valido, texto }: { valido: boolean; texto: string }) => (
    <View className={`flex-row items-center px-2 py-1 rounded-lg ${valido ? 'bg-green-100' : 'bg-gray-50'}`}>
        <Feather name={valido ? "check" : "circle"} size={10} color={valido ? "#16a34a" : "#9ca3af"} />
        <Text className={`ml-1 text-[10px] font-bold ${valido ? 'text-green-700' : 'text-gray-400'}`}>{texto}</Text>
    </View>
);
