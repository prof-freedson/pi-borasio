import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SobrePage() {
  const router = useRouter();

  const stats = [
    { value: "50k+", label: "Caronas", icon: <FontAwesome5 name="car-side" size={24} color="#FACC15" /> },
    { value: "15k+", label: "Usuários", icon: <Feather name="users" size={24} color="#FACC15" /> },
    { value: "4.9", label: "Avaliação", icon: <Feather name="star" size={24} color="#FACC15" /> }
  ];

  const values = [
    {
      title: "Identidade",
      desc: "Entendemos o sotaque e o jeito da Ilha. Não somos apenas um app, somos parte de São Luís.",
      icon: <Feather name="map-pin" size={32} color="#FACC15" />
    },
    {
      title: "Segurança",
      desc: "Monitoramento e verificação rigorosa. Sua segurança é prioridade, da Cohab ao Cohatrac.",
      icon: <Feather name="shield" size={32} color="#FACC15" />
    },
    {
      title: "Economia",
      desc: "Preços que cabem no bolso, com transparência total em cada rota.",
      icon: <Feather name="zap" size={32} color="#FACC15" />
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar style="light" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* Hero Section */}
        <View className="bg-[#004d2b] py-20 px-6 rounded-b-[3rem] relative overflow-hidden shadow-2xl items-center justify-center">
          {/* Background Decoration */}
          <View className="absolute top-0 left-0 w-full h-full opacity-20">
            <View className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl" />
            <View className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl" />
          </View>

          <View className="items-center">
            <Text className="text-4xl font-black text-white text-center leading-tight mb-4">
              Mais que um App,
            </Text>
            <Text className="text-4xl font-black text-yellow-400 text-center leading-tight mb-6">
              Nossa Identidade.
            </Text>
            <Text className="text-green-100 text-center text-lg leading-relaxed font-medium">
              O BoraSiô nasceu para conectar São Luís de ponta a ponta.
            </Text>
          </View>
        </View>

        {/* Nossa Jornada */}
        <View className="px-6 py-12">
          <View className="bg-white rounded-3xl overflow-hidden shadow-lg border border-green-50 mb-8 aspect-video bg-gray-200 justify-center items-center">
            <Text className="text-gray-400 font-bold">[Imagem da Equipe]</Text>
            {/* <Image source={require('../assets/borasio.png')} className="w-full h-full" resizeMode="cover" /> */}
          </View>

          <View className="bg-green-50 self-start px-3 py-1 rounded-lg border border-green-200 mb-4">
            <Text className="text-[#004d2b] font-bold text-xs uppercase tracking-wider">Nossa Jornada</Text>
          </View>

          <Text className="text-3xl font-black text-[#004d2b] mb-4">
            Ritmo da <Text className="text-green-600">Cidade</Text>
          </Text>

          <Text className="text-gray-600 text-base leading-relaxed mb-6 text-justify">
            Entendemos que uma corrida da Cidade Operária para o Renascença não é apenas um deslocamento, é a vida acontecendo.
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {["Motoristas Locais", "Segurança", "Suporte", "Preço Justo"].map((item, i) => (
              <View key={i} className="flex-row items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
                <Feather name="check-circle" size={16} color="#22c55e" />
                <Text className="font-bold text-[#004d2b] text-xs">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pilares */}
        <View className="bg-[#004d2b] py-16 px-6 relative overflow-hidden">
          {/* Pattern */}
          <View className="absolute top-0 right-0 w-64 h-64 border-[30px] border-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />

          <Text className="text-3xl font-black text-white text-center mb-2">Nossos Pilares</Text>
          <Text className="text-green-100/70 text-center mb-10">O que nos move todos os dias.</Text>

          <View className="gap-6">
            {values.map((item, index) => (
              <View key={index} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <View className="bg-white/10 w-14 h-14 rounded-2xl items-center justify-center mb-4">
                  {item.icon}
                </View>
                <Text className="text-xl font-bold text-white mb-2">{item.title}</Text>
                <Text className="text-green-100/70 leading-relaxed text-sm">
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 -mt-8 mb-12">
          <View className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-green-50 flex-row justify-between items-center">
            {stats.map((stat, index) => (
              <View key={index} className="items-center flex-1">
                <View className="mb-2">{stat.icon}</View>
                <Text className="text-xl font-black text-[#004d2b]">{stat.value}</Text>
                <Text className="text-[8px] text-gray-400 font-bold uppercase tracking-widest text-center">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Final */}
        <View className="px-6 pb-12">
          <View className="bg-gradient-to-br from-[#004d2b] to-green-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
            <View className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl" />

            <Text className="text-3xl font-black text-white mb-6 text-center leading-tight">
              Bora transformar a sua <Text className="text-yellow-400">circulação?</Text>
            </Text>

            <View className="gap-4">
              <TouchableOpacity className="bg-yellow-400 py-4 px-6 rounded-xl flex-row justify-center items-center gap-2 shadow-lg">
                <Feather name="zap" size={20} color="#004d2b" />
                <Text className="text-[#004d2b] font-black text-sm uppercase tracking-wide">Baixar App</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white/10 py-4 px-6 rounded-xl flex-row justify-center items-center gap-2 border border-white/10">
                <Text className="text-white font-bold text-sm">Ser Motorista</Text>
                <Feather name="chevron-right" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <View className="mt-8 flex-row justify-center items-center gap-2">
              <View className="flex-row -space-x-2">
                {[1, 2, 3].map(i => (
                  <View key={i} className="w-6 h-6 rounded-full bg-green-800 border-2 border-[#004d2b]" />
                ))}
              </View>
              <Text className="text-green-100/50 text-xs font-medium">+15k usuários</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
