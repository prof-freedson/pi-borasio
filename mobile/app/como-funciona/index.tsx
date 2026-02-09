import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ComoFuncionaPage() {
  const router = useRouter();

  const steps = [
    {
      icon: <MaterialCommunityIcons name="satellite-uplink" size={40} color="white" />,
      title: "Coleta de Dados",
      description: "Nosso sistema captura informações de múltiplas fontes para entender o fluxo do trânsito:",
      details: [
        "📡 Sensores urbanos",
        "🛰️ Dados de GPS",
        "🏛️ Órgãos oficiais",
        "🤝 Relatos de motoristas"
      ]
    },
    {
      icon: <Feather name="cpu" size={40} color="white" />,
      title: "Processamento",
      description: "Utilizamos algoritmos de machine learning para analisar e prever padrões de tráfego:",
      details: [
        "🧠 Análise preditiva",
        "⚡ Padrões sazonais",
        "🤖 Rotas por IA",
        "💻 Aprendizado real"
      ]
    },
    {
      icon: <Feather name="bar-chart-2" size={40} color="white" />,
      title: "Análise",
      description: "Transformamos dados brutos em insights acionáveis para melhorar seu deslocamento:",
      details: [
        "📈 Alta precisão",
        "🎯 Gargalos visíveis",
        "🛣️ Rotas curtas",
        "⚖️ Balanceamento"
      ]
    },
    {
      icon: <Feather name="smartphone" size={40} color="white" />,
      title: "Distribuição",
      description: "As informações processadas são entregues de forma integrada aos usuários:",
      details: [
        "📱 App integrado",
        "📲 Tempo real",
        "🔔 Notificações",
        "✅ Decisão rápida"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Feather name="clock" size={28} color="#004d2b" />,
      title: "Economia de Tempo",
      description: "Redução média de 23% no tempo de deslocamento."
    },
    {
      icon: <Feather name="shield" size={28} color="#004d2b" />,
      title: "Mais Segurança",
      description: "Evitação de áreas e rotas perigosas."
    },
    {
      icon: <Feather name="database" size={28} color="#004d2b" />,
      title: "Menos Consumo",
      description: "Economia de combustível com rotas eficientes."
    },
    {
      icon: <Feather name="users" size={28} color="#004d2b" />,
      title: "Experiência",
      description: "Passageiros e motoristas mais satisfeitos."
    }
  ];

  const technicalSpecs = [
    { title: "Cobertura", value: "92% das vias mapeadas" },
    { title: "Atualização", value: "Dados a cada 45s" },
    { title: "Precisão", value: "92% de acerto" },
    { title: "Latência", value: "Menos de 800ms" }
  ];

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar style="light" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* Header Premium */}
        <View className="bg-[#004d2b] py-6 px-4 pb-8 rounded-b-3xl shadow-xl z-20">
          <View className="flex-row items-center justify-between mt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center bg-white/10 px-3 py-2 rounded-xl border border-white/10"
            >
              <Feather name="chevron-left" size={20} color="white" />
              <Text className="text-white font-medium ml-1">Voltar</Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-2">
              <View className="bg-yellow-400 p-1.5 rounded-lg">
                <Feather name="cpu" size={16} color="#004d2b" />
              </View>
              <Text className="text-white font-bold text-lg tracking-tight uppercase">Bastidores</Text>
            </View>
          </View>

          <View className="mt-8 space-y-2">
            <View className="flex-row items-center bg-[#004d2b] self-start px-3 py-1 rounded-full border border-green-700">
              <View className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />
              <Text className="text-[10px] font-black uppercase tracking-widest text-green-300">Infraestrutura IA</Text>
            </View>
            <Text className="text-3xl font-black text-white leading-tight">
              Como o <Text className="text-yellow-400">Cérebro</Text> da Ilha Processa.
            </Text>
            <Text className="text-green-100/80 text-base font-medium leading-relaxed mt-2">
              Uma rede neural urbana que analisa trilhões de dados para garantir que a cidade não pare.
            </Text>
          </View>
        </View>

        {/* Passo a Passo */}
        <View className="px-4 -mt-6 pb-8">
          {steps.map((step, index) => (
            <View key={index} className="bg-white p-6 mb-6 rounded-3xl shadow-lg border border-green-50 relative overflow-hidden">
              <View className="absolute -top-5 -right-5 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl" />

              <View className="flex-row items-center justify-between mb-4">
                <View className="bg-[#004d2b] w-14 h-14 rounded-2xl items-center justify-center shadow-md">
                  {step.icon}
                </View>
                <Text className="text-4xl font-black text-green-50/50">{index + 1}</Text>
              </View>

              <Text className="text-xl font-black text-[#004d2b] mb-2 uppercase tracking-tight">{step.title}</Text>
              <Text className="text-gray-500 font-medium mb-4 leading-relaxed text-sm">
                {step.description}
              </Text>

              <View className="flex-row flex-wrap gap-2">
                {step.details.map((detail, i) => (
                  <View key={i} className="bg-green-50/50 px-3 py-1.5 rounded-lg border border-green-100/50">
                    <Text className="text-[10px] font-bold text-[#004d2b] uppercase tracking-wide">{detail}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Specs Dashboard */}
        <View className="bg-[#004d2b] py-12 px-4 mb-8">
          <Text className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.3em] mb-2 text-center">Performance</Text>
          <Text className="text-2xl font-black text-white text-center mb-8">Métricas em Tempo Real</Text>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            {technicalSpecs.map((spec, index) => (
              <View key={index} className="w-[48%] bg-white/5 border border-white/10 p-4 rounded-3xl items-center">
                <Text className="text-2xl font-black text-yellow-400 mb-1">{spec.value.split(' ')[0]}</Text>
                <Text className="text-[8px] font-black text-green-100 uppercase tracking-widest opacity-60 mb-1">{spec.title}</Text>
                <Text className="text-[10px] font-bold text-white/40 text-center">{spec.value.split(' ').slice(1).join(' ')}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Benefícios */}
        <View className="px-4 mb-12">
          <View className="bg-white rounded-3xl p-6 shadow-xl border border-green-50">
            <Text className="text-2xl font-black text-[#004d2b] mb-6 text-center">Por que escolher?</Text>

            <View className="flex-row flex-wrap justify-between gap-y-8">
              {benefits.map((benefit, index) => (
                <View key={index} className="w-[48%] items-center space-y-2">
                  <View className="bg-green-50 w-12 h-12 rounded-xl items-center justify-center mb-2">
                    {benefit.icon}
                  </View>
                  <Text className="font-black text-[#004d2b] uppercase text-[10px] tracking-widest text-center">{benefit.title}</Text>
                  <Text className="text-xs text-gray-500 text-center leading-relaxed">{benefit.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* FAQ - Simplificado */}
        <View className="px-4 mb-12">
          <Text className="text-2xl font-black text-[#004d2b] text-center mb-6">Dúvidas Técnicas</Text>
          <View className="space-y-4">
            <View className="bg-white p-6 rounded-3xl shadow-sm border border-green-50">
              <View className="flex-row items-center gap-3 mb-2">
                <View className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <Text className="font-black text-[#004d2b] uppercase text-xs tracking-widest">Coleta de dados</Text>
              </View>
              <Text className="text-sm text-gray-600 font-medium leading-relaxed">
                Usamos IoT urbana e câmeras de visão computacional para criar um mapa de calor dinâmico da cidade.
              </Text>
            </View>

            <View className="bg-white p-6 rounded-3xl shadow-sm border border-green-50">
              <View className="flex-row items-center gap-3 mb-2">
                <View className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <Text className="font-black text-[#004d2b] uppercase text-xs tracking-widest">Privacidade</Text>
              </View>
              <Text className="text-sm text-gray-600 font-medium leading-relaxed">
                Dados criptografados e anonimizados. Focamos em padrões de fluxo, não em indivíduos.
              </Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View className="px-4 pb-12">
          <View className="bg-[#004d2b] py-12 px-6 rounded-[3rem] items-center relative overflow-hidden shadow-2xl">
            <View className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-10" />

            <Text className="text-2xl font-black text-white text-center mb-4">Pronto para o futuro?</Text>
            <Text className="text-green-100/60 text-center font-medium mb-8 text-sm">
              A tecnologia agora está ao seu alcance. Ative o modo inteligente.
            </Text>

            <View className="w-full gap-4">
              <View className="bg-yellow-400 rounded-xl w-full">
                <TouchableOpacity className="py-4 items-center active:opacity-90">
                  <Text className="text-[#004d2b] font-black uppercase tracking-widest text-xs">Ativar Agora</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="py-4 items-center border border-white/10 rounded-xl" onPress={() => router.push('/transito-inteligente' as any)}>
                <Text className="text-white font-black uppercase tracking-widest text-xs">Explorar Mais</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-center text-gray-400 text-[10px] font-black uppercase tracking-widest mt-8">
            &copy; 2024 BoraSiô | São Luís
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
