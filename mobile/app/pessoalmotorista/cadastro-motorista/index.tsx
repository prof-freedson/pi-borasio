import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Switch,
    Alert,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../../../global.css";

const PRIMARY_GREEN = "#064e3b"; // green-900
const BG_GREEN = "#dcfce7"; // green-100
const ACCENT_YELLOW = "#fef08a"; // yellow-300

interface FormState {
    nome: string;
    cnh: string;
    endereco: string;
    email: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
    veiculoMarca: string;
    veiculoModelo: string;
    veiculoPlaca: string;
    veiculoCor: string;
    veiculoArCondicionado: boolean;
    veiculoCombustivel: string;
    veiculoAssentos: string;
}

export default function CadastroMotorista() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [form, setForm] = useState<FormState>({
        nome: "",
        cnh: "",
        endereco: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
        veiculoMarca: "",
        veiculoModelo: "",
        veiculoPlaca: "",
        veiculoCor: "",
        veiculoArCondicionado: false,
        veiculoCombustivel: "",
        veiculoAssentos: "",
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleChange = (name: keyof FormState, value: string) => {
        if (name === "telefone") {
            let maskedValue = value.replace(/\D/g, "");
            maskedValue = maskedValue.replace(/^(\d{2})(\d)/, "($1) $2");
            maskedValue = maskedValue.replace(/(\d{5})(\d)/, "$1-$2");
            setForm(prev => ({ ...prev, [name]: maskedValue.slice(0, 15) }));
        } else if (name === "cnh") {
            const maskedValue = value.replace(/\D/g, "");
            setForm(prev => ({ ...prev, [name]: maskedValue.slice(0, 11) }));
        } else if (name === "veiculoPlaca") {
            const maskedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
            setForm(prev => ({ ...prev, [name]: maskedValue.slice(0, 7) }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateStep1 = () => {
        if (!form.nome) return "Nome é obrigatório";
        if (!form.cnh) return "CNH é obrigatória";
        if (!form.email || !form.email.includes("@")) return "E-mail válido é obrigatório";
        if (!form.telefone) return "Telefone é obrigatório";
        if (!form.senha || form.senha.length < 6) return "Senha deve ter pelo menos 6 caracteres";
        if (form.senha !== form.confirmarSenha) return "As senhas não coincidem";
        return null;
    };

    const validateStep2 = () => {
        if (!form.veiculoMarca) return "Marca do veículo é obrigatória";
        if (!form.veiculoModelo) return "Modelo do veículo é obrigatório";
        if (!form.veiculoPlaca) return "Placa do veículo é obrigatória";
        if (!form.veiculoCombustivel) return "Combustível é obrigatório";
        if (!form.veiculoAssentos) return "Nº de assentos é obrigatório";
        if (!termsAccepted) return "Você deve aceitar os termos";
        return null;
    };

    const handleNext = () => {
        const error = validateStep1();
        if (error) {
            Alert.alert("Erro", error);
            console.log("Validation error:", error);
            return;
        }
        console.log("Moving to step 2");
        setStep(2);
    };

    const handleSubmit = async () => {
        const error = validateStep2();
        if (error) {
            Alert.alert("Erro", error);
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                ...form,
                veiculoArCondicionado: form.veiculoArCondicionado ? "sim" : "não",
            };

            const response = await fetch("http://10.0.2.2:3000/auth/register/motorista", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro desconhecido ao cadastrar motorista.");
            }

            Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                { text: "OK", onPress: () => router.push("/") }
            ]);

        } catch (err: any) {
            console.error(err);
            Alert.alert("Erro", err.message || "Ocorreu um erro ao conectar com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#dcfce7]">
            <Stack.Screen options={{
                headerShown: true,
                title: "Cadastro de Motorista",
                headerStyle: { backgroundColor: '#064e3b' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    className="px-6 py-6"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Progress Indicator */}
                    <View className="flex-row items-center justify-center mb-8">
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${step >= 1 ? 'bg-[#064e3b]' : 'bg-green-200'}`}>
                            <Text className="text-white font-bold">1</Text>
                        </View>
                        <View className={`h-1 w-12 ${step === 2 ? 'bg-[#064e3b]' : 'bg-green-200'}`} />
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${step === 2 ? 'bg-[#064e3b]' : 'bg-green-200'}`}>
                            <Text className={`${step === 2 ? 'text-white' : 'text-green-900'} font-bold`}>2</Text>
                        </View>
                    </View>

                    <View className="bg-white rounded-3xl p-6 shadow-xl shadow-black/10 border border-green-50">
                        {step === 1 ? (
                            <View className="space-y-4">
                                <View className="mb-4">
                                    <Text className="text-2xl font-black text-[#064e3b] mb-1">Dados Pessoais</Text>
                                    <Text className="text-gray-500">Comece informando seus dados básicos.</Text>
                                </View>

                                <InputField
                                    label="Nome Completo"
                                    icon="user"
                                    value={form.nome}
                                    onChangeText={(v) => handleChange("nome", v)}
                                    placeholder="Seu nome completo"
                                />

                                <InputField
                                    label="CNH"
                                    icon="credit-card"
                                    value={form.cnh}
                                    onChangeText={(v) => handleChange("cnh", v)}
                                    placeholder="Número da sua CNH"
                                    keyboardType="numeric"
                                />

                                <InputField
                                    label="E-mail"
                                    icon="mail"
                                    value={form.email}
                                    onChangeText={(v) => handleChange("email", v)}
                                    placeholder="seu@email.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />

                                <InputField
                                    label="Telefone"
                                    icon="phone"
                                    value={form.telefone}
                                    onChangeText={(v) => handleChange("telefone", v)}
                                    placeholder="(00) 00000-0000"
                                    keyboardType="phone-pad"
                                />

                                <InputField
                                    label="Senha"
                                    icon="lock"
                                    value={form.senha}
                                    onChangeText={(v) => handleChange("senha", v)}
                                    placeholder="••••••••"
                                    secureTextEntry={!mostrarSenha}
                                    rightIcon={mostrarSenha ? "eye-off" : "eye"}
                                    onRightIconPress={() => setMostrarSenha(!mostrarSenha)}
                                />

                                <InputField
                                    label="Confirmar Senha"
                                    icon="check-circle"
                                    value={form.confirmarSenha}
                                    onChangeText={(v) => handleChange("confirmarSenha", v)}
                                    placeholder="••••••••"
                                    secureTextEntry={!mostrarConfirmarSenha}
                                    rightIcon={mostrarConfirmarSenha ? "eye-off" : "eye"}
                                    onRightIconPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                />

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={handleNext}
                                    className="bg-[#fef08a] py-4 rounded-2xl items-center flex-row justify-center mt-6 shadow-md shadow-yellow-400/30"
                                >
                                    <Text className="text-[#064e3b] font-black text-lg mr-2">PRÓXIMO</Text>
                                    <Feather name="arrow-right" size={20} color="#064e3b" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="space-y-4">
                                <View className="mb-4">
                                    <Text className="text-2xl font-black text-[#064e3b] mb-1">Dados do Veículo</Text>
                                    <Text className="text-gray-500">Agora, as informações sobre o que você dirige.</Text>
                                </View>

                                <InputField
                                    label="Marca"
                                    icon="tag"
                                    value={form.veiculoMarca}
                                    onChangeText={(v) => handleChange("veiculoMarca", v)}
                                    placeholder="Ex: Toyota, Honda..."
                                />

                                <InputField
                                    label="Modelo"
                                    icon="box"
                                    value={form.veiculoModelo}
                                    onChangeText={(v) => handleChange("veiculoModelo", v)}
                                    placeholder="Ex: Corolla, Civic..."
                                />

                                <InputField
                                    label="Placa"
                                    icon="grid"
                                    value={form.veiculoPlaca}
                                    onChangeText={(v) => handleChange("veiculoPlaca", v)}
                                    placeholder="ABC1D23"
                                    autoCapitalize="characters"
                                />

                                <InputField
                                    label="Cor"
                                    icon="droplet"
                                    value={form.veiculoCor}
                                    onChangeText={(v) => handleChange("veiculoCor", v)}
                                    placeholder="Ex: Branco, Preto..."
                                />

                                <View className="flex-row items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100 mb-2">
                                    <View className="flex-row items-center">
                                        <Feather name="wind" size={20} color="#064e3b" />
                                        <Text className="ml-3 font-bold text-[#064e3b]">Ar-Condicionado</Text>
                                    </View>
                                    <Switch
                                        value={form.veiculoArCondicionado}
                                        onValueChange={(v) => setForm({ ...form, veiculoArCondicionado: v })}
                                        trackColor={{ false: "#d1d5db", true: "#86efac" }}
                                        thumbColor={form.veiculoArCondicionado ? "#064e3b" : "#f3f4f6"}
                                    />
                                </View>

                                <InputField
                                    label="Combustível"
                                    icon="zap"
                                    value={form.veiculoCombustivel}
                                    onChangeText={(v) => handleChange("veiculoCombustivel", v)}
                                    placeholder="Gasolina, Diesel, Flex..."
                                />

                                <InputField
                                    label="Nº de Assentos"
                                    icon="users"
                                    value={form.veiculoAssentos}
                                    onChangeText={(v) => handleChange("veiculoAssentos", v)}
                                    placeholder="Total de assentos"
                                    keyboardType="numeric"
                                />

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setTermsAccepted(!termsAccepted)}
                                    className="flex-row items-center mb-6 mt-2"
                                >
                                    <View className={`w-6 h-6 rounded border ${termsAccepted ? 'bg-[#064e3b] border-[#064e3b]' : 'bg-white border-gray-300'} items-center justify-center mr-3`}>
                                        {termsAccepted && <Feather name="check" size={16} color="white" />}
                                    </View>
                                    <Text className="text-xs text-gray-500 flex-1">
                                        Eu li e aceito os <Text className="text-[#064e3b] font-bold">Termos de Serviço</Text> e a <Text className="text-[#064e3b] font-bold">Política de Privacidade</Text>.
                                    </Text>
                                </TouchableOpacity>

                                <View className="flex-row space-x-4">
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => setStep(1)}
                                        className="flex-1 bg-gray-100 py-4 rounded-2xl items-center border border-gray-200"
                                    >
                                        <Text className="text-gray-600 font-black">VOLTAR</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={handleSubmit}
                                        disabled={isLoading}
                                        className={`flex-[2] bg-[#fef08a] py-4 rounded-2xl items-center flex-row justify-center shadow-lg shadow-yellow-400/30 ${isLoading ? 'opacity-70' : ''}`}
                                    >
                                        <Text className="text-[#064e3b] font-black text-lg mr-2">
                                            {isLoading ? "CADASTRANDO..." : "CONCLUIR"}
                                        </Text>
                                        {!isLoading && <Feather name="check" size={20} color="#064e3b" />}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push("/pessoal/login")}
                        className="mt-8 items-center"
                    >
                        <Text className="text-green-900 font-medium">
                            Já tem uma conta? <Text className="font-black underline">Fazer Login</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

interface InputFieldProps {
    label: string;
    icon: keyof typeof Feather.glyphMap;
    value: string;
    onChangeText: (v: string) => void;
    placeholder?: string;
    rightIcon?: keyof typeof Feather.glyphMap;
    onRightIconPress?: () => void;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    secureTextEntry?: boolean;
}

function InputField({
    label,
    icon,
    value,
    onChangeText,
    placeholder,
    rightIcon,
    onRightIconPress,
    ...props
}: InputFieldProps) {
    return (
        <View className="mb-4">
            <Text className="text-[#064e3b] font-bold text-sm mb-2 ml-1">{label}</Text>
            <View className="flex-row items-center bg-green-50 border border-green-100 rounded-2xl px-4 py-3 focus:border-[#064e3b]">
                <Feather name={icon} size={18} color="#064e3b" />
                <TextInput
                    className="flex-1 ml-3 text-green-950 font-medium"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress}>
                        <Feather name={rightIcon} size={18} color="#6b7280" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
