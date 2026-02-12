import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../../global.css";

export default function DesviosInteligentesPage() {
  const router = useRouter();

  const activeDetours = [
    {
      icon: <FontAwesome5 name="road" size={20} color="#ea580c" />,
      title: "Obras Av. Holandeses",
      description: "Redução de faixas (Shopping da Ilha)",
      duration: "Até 15/12",
      severity: "Alto",
      severityColor: "bg-red-100",
      severityTextColor: "text-red-800"
    },
    {
      icon: <FontAwesome5 name="traffic-light" size={20} color="#ca8a04" />,
      title: "Interdição Daniel de La Touche",
      description: "Reparos no asfalto",
      duration: "Até 10/12",
      severity: "Médio",
      severityColor: "bg-yellow-100",
      severityTextColor: "text-yellow-800"
    },
    {
      icon: <Feather name="alert-triangle" size={20} color="#2563eb" />,
      title: "Evento Castelão",
      description: "Trânsito intenso após 16h",
      duration: "02/12",
      severity: "Médio",
      severityColor: "bg-yellow-100",
      severityTextColor: "text-yellow-800"
    },
  ];

  const alternativeRoutes = [
    {
      from: "Centro",
      to: "Renascença",
      usualTime: "25 min",
      alternativeTime: "18 min",
      savedTime: "7 min",
      route: "Av. Ferreira Gullar → Av. Franceses"
    },
    {
      from: "Jardim Renascença",
      to: "São Francisco",
      usualTime: "35 min",
      alternativeTime: "28 min",
      savedTime: "7 min",
      route: "Av. Holandeses → Rua da Paz"
    },
    {
      from: "Tirirical",
      to: "Calhau",
      usualTime: "40 min",
      alternativeTime: "32 min",
      savedTime: "8 min",
      route: "Av. Casemiro → Carlos Cunha"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Monitoramento",
      description: "Identificamos obras e eventos em tempo real.",
      icon: <Feather name="map" size={24} color="#004d2b" />
    },
    {
      step: "2",
      title: "Análise",
      description: "Calculamos rotas mais eficientes.",
      icon: <Feather name="clock" size={24} color="#004d2b" />
    },
    {
      step: "3",
      title: "Notificação",
      description: "Alertas sobre rotas otimizadas.",
      icon: <Feather name="bell" size={24} color="#004d2b" />
    }
  ];

  return (
    <View className="flex-1 bg-green-50">
      <ScrollView contentContainerClassName="pb-8">
        {/* Header */}
        <View className="bg-[#004d2b] pt-12 pb-6 px-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
              <Feather name="chevron-left" size={24} color="white" />
              <Text className="text-white text-lg ml-2">Voltar</Text>
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Desvios</Text>
            <View className="w-8" />
          </View>
        </View>

        {/* Intro */}
        <View className="p-6">
            <Text className="text-2xl font-bold text-[#004d2b] mb-2">
                Fuja do Trânsito
            </Text>
            <Text className="text-gray-600 mb-4">
                Identificamos obras e eventos automaticamente.
            </Text>
            <View className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <Text className="text-blue-800 font-medium">
                    Monitorando: 12 obras, 3 eventos em SLZ.
                </Text>
            </View>
        </View>

        {/* Active Detours */}
        <View className="px-4 mb-8">
            <Text className="text-xl font-bold text-[#004d2b] mb-4">Desvios Ativos</Text>
            <View className="gap-4">
                {activeDetours.map((detour, index) => (
                    <View key={index} className="bg-white p-4 rounded-xl shadow-sm">
                        <View className="flex-row justify-between items-start mb-2">
                            <View className="flex-row items-center gap-2 flex-1">
                                {detour.icon}
                                <Text className="font-bold text-gray-800 flex-1">{detour.title}</Text>
                            </View>
                            <View className={`px-2 py-1 rounded-full ${detour.severityColor}`}>
                                <Text className={`text-xs font-bold ${detour.severityTextColor}`}>{detour.severity}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-600 text-sm mb-2">{detour.description}</Text>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-400 font-medium">{detour.duration}</Text>
                            <TouchableOpacity>
                                <Text className="text-[#004d2b] font-bold text-sm">Ver rota</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>

        {/* Alternative Routes */}
        <View className="px-4 mb-8">
            <Text className="text-xl font-bold text-[#004d2b] mb-4">Rotas Sugeridas</Text>
            <View className="gap-4">
                {alternativeRoutes.map((route, index) => (
                    <View key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <View className="flex-row justify-between items-center mb-3">
                            <View>
                                <Text className="font-bold text-gray-800 text-lg">{route.from}</Text>
                                <Feather name="arrow-down" size={16} color="#9ca3af" />
                                <Text className="font-bold text-gray-800 text-lg">{route.to}</Text>
                            </View>
                            <View className="items-end">
                                <View className="bg-green-100 px-3 py-1 rounded-full mb-1">
                                    <Text className="text-green-800 font-bold text-xs">Economia: {route.savedTime}</Text>
                                </View>
                                <Text className="text-gray-400 text-xs line-through">{route.usualTime}</Text>
                                <Text className="text-green-600 font-bold text-xl">{route.alternativeTime}</Text>
                            </View>
                        </View>
                        <View className="bg-gray-50 p-3 rounded-lg flex-row gap-2 items-center">
                            <FontAwesome5 name="route" size={14} color="#6b7280" />
                            <Text className="text-gray-600 text-xs flex-1" numberOfLines={1}>{route.route}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>

        {/* How it works */}
        <View className="px-4">
            <Text className="text-xl font-bold text-[#004d2b] mb-4 text-center">Como Funciona</Text>
            <View className="flex-row justify-between gap-2">
                {howItWorks.map((step, index) => (
                    <View key={index} className="bg-white p-3 rounded-xl shadow-sm flex-1 items-center">
                        <View className="mb-2">
                            {step.icon}
                        </View>
                        <Text className="font-bold text-[#004d2b] text-center mb-1 text-sm">{step.title}</Text>
                        <Text className="text-gray-500 text-[10px] text-center leading-tight">{step.description}</Text>
                    </View>
                ))}
            </View>
        </View>

      </ScrollView>
    </View>
  );
}
