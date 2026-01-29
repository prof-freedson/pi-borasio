import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../global.css";

type BenefitItem = {
  title: string;
  displayTitle?: string;
  desc: string;
  icon: keyof typeof Feather.glyphMap;
  isLink?: boolean;
};

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

export default function App() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const carouselContent = [
    {
      image: "https://images.unsplash.com/photo-1565514020176-6c2235c8e8b0?q=80&w=1200&auto=format&fit=crop",
      title: "Mobilidade com Jeito Maranhense",
      subtitle: "Um app de carona mais humano, mais seguro e mais local.",
    },
    {
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
      title: "Economize tempo e dinheiro",
      subtitle: "Compartilhe caronas e reduza seus custos de transporte diário.",
    },
    {
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
      title: "Segurança em primeiro lugar",
      subtitle: "Motoristas verificados e recursos de segurança para sua tranquilidade.",
    },
    {
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
      title: "Conectando a cidade",
      subtitle: "Rotas inteligentes que abrangem toda a região metropolitana de São Luís.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % carouselContent.length;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, width]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const menuItems: MenuItem[] = [
    { id: "", label: "Início", icon: "home" },
    { id: "sobre", label: "Sobre", icon: "info" },
    { id: "contato", label: "Contato", icon: "mail" },
    { id: "pessoal/login", label: "Login", icon: "log-in" },
    { id: "pagamento", label: "Pagamento", icon: "credit-card" },
    { id: "escolha-usuario", label: "Cadastrar", icon: "user-plus" },
    { id: "resetar-senha", label: "Recuperar Senha", icon: "key" },
  ];

  const handleMenuPress = (id: string) => {
    setIsModalOpen(false);
    if (id !== "") {
      router.push(`/${id}` as any);
    }
  };

  const onScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffset / viewSize);
    if (index !== currentSlide && index >= 0 && index < carouselContent.length) {
      setCurrentSlide(index);
    }
  };

  const featureCards: BenefitItem[] = [
    {
      title: "transito-inteligente",
      displayTitle: "Trânsito Inteligente",
      desc: "Rotas em tempo real evitando trânsitos locais.",
      icon: "activity",
    },
    {
      title: "eventos-culturais",
      displayTitle: "Eventos Culturais",
      desc: "Caronas garantidas para os maiores eventos da ilha.",
      icon: "music",
    },
    {
      title: "modo-ilha",
      displayTitle: "Modo Ilha",
      desc: "Conexão otimizada entre os bairros de São Luís.",
      icon: "map",
    },
    {
      title: "corrida-em-grupo",
      displayTitle: "Corrida em Grupo",
      desc: "Economize até 40% dividindo sua rota.",
      icon: "users",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100 z-50">
        <View className="flex-row items-center space-x-2">
          <View className="bg-green-700 w-8 h-8 rounded-lg items-center justify-center">
            <Feather name="navigation" size={18} color="white" />
          </View>
          <Text className="text-xl font-black text-green-900 tracking-tight ml-2">BORASIÔ</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          className="p-2 bg-gray-50 rounded-full"
        >
          <Feather name="menu" size={24} color="#064e3b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Carousel */}
        <View className="relative" style={{ height: height * 0.45 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScroll}
            scrollEventThrottle={16}
          >
            {carouselContent.map((item, index) => (
              <View key={index} style={{ width, height: height * 0.45 }} className="relative">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/40" />
                <View className="absolute inset-0 justify-end pb-16 px-8">
                  <Text className="text-4xl font-black text-white mb-2 leading-tight shadow-sm">
                    {item.title}
                  </Text>
                  <Text className="text-lg text-white/90 mb-8 font-medium">
                    {item.subtitle}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    className="bg-yellow-400 self-start px-8 py-4 rounded-2xl flex-row items-center shadow-xl shadow-yellow-400/50"
                    onPress={() => setIsModalOpen(true)}
                  >
                    <Text className="text-green-950 font-black text-base mr-2">COMEÇAR</Text>
                    <Feather name="arrow-right" size={20} color="#052e16" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Indicators */}
          <View className="absolute top-4 right-6 flex-row items-center space-x-2 gap-2 bg-black/30 px-3 py-1.5 rounded-full">
            {carouselContent.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-6 bg-yellow-400" : "w-1.5 bg-white/50"
                  }`}
              />
            ))}
          </View>
        </View>

        {/* Welcome Section (Moved below Carousel) */}
        <View className="px-6 py-8">
          <View className="bg-white rounded-[40px] p-8 shadow-xl shadow-black/5 border border-gray-100">
            <Text className="text-xs font-black text-green-700 uppercase tracking-widest mb-3">Bem-vindo a São Luís</Text>
            <Text className="text-3xl font-black text-gray-900 mb-4 leading-tight">
              Mobilidade que entende o nosso ritmo.
            </Text>
            <Text className="text-gray-500 leading-relaxed mb-8 text-base font-medium">
              O Borasiô nasceu para conectar quem precisa se deslocar com quem busca uma forma mais rápida e barata de atravessar a ilha.
            </Text>

            <View className="space-y-6 gap-6">
              <View className="flex-row items-start">
                <View className="bg-green-100 p-3 rounded-2xl mr-4">
                  <Feather name="shield" size={24} color="#047857" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-black text-lg mb-1">Segurança em primeiro lugar</Text>
                  <Text className="text-gray-500 text-sm leading-5">Motoristas verificados e recursos de segurança para sua tranquilidade.</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="bg-green-100 p-3 rounded-2xl mr-4">
                  <Feather name="map" size={24} color="#047857" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-black text-lg mb-1">Conectando a cidade</Text>
                  <Text className="text-gray-500 text-sm leading-5">Rotas inteligentes que abrangem toda a região metropolitana de São Luís.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Feature Grid */}
        <View className="px-6 py-10">
          <View className="flex-row justify-between items-end mb-8">
            <View>
              <Text className="text-2xl font-black text-gray-900">Funcionalidades</Text>
              <View className="h-1.5 w-12 bg-yellow-400 rounded-full mt-1" />
            </View>
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
              <Text className="text-green-700 font-bold">Ver todas</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-4">
            {featureCards.map((item, index) => {
              const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2;
              const cardWidth = (width - 48 - (numColumns - 1) * 16) / numColumns;

              return (
                <Pressable
                  key={index}
                  style={{ width: cardWidth }}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
                  onPress={() => router.push(`/${item.title}` as any)}
                >
                  <View className="bg-green-50 w-14 h-14 rounded-2xl items-center justify-center mb-6">
                    <Feather name={item.icon} size={28} color="#047857" />
                  </View>
                  <Text className="text-green-950 font-black mb-2 text-sm leading-tight">
                    {item.displayTitle}
                  </Text>
                  <Text className="text-xs text-gray-500 leading-normal">
                    {item.desc}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Regional Focus Section */}
        <View className="px-6 mb-10">
          <View className="bg-green-800 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop" }}
              className="w-full h-40 opacity-60"
            />
            <View className="p-8 -mt-10">
              <View className="flex-row items-center mb-4 space-x-2">
                <Feather name="map-pin" size={20} color="#fde047" />
                <Text className="text-xl font-black text-yellow-300 ml-2">Foco Regional</Text>
              </View>
              <Text className="text-white/90 mb-6 leading-relaxed">
                Desenvolvido especialmente para as necessidades únicas da nossa ilha, garantindo que você chegue ao seu destino com agilidade.
              </Text>
              <View className="space-y-3 gap-2">
                {["Rotas otimizadas para a ilha", "Integração total com terminais"].map((item, idx) => (
                  <View key={idx} className="flex-row items-center">
                    <View className="w-5 h-5 bg-yellow-400/20 rounded-full items-center justify-center mr-3">
                      <Feather name="check" size={12} color="#fde047" />
                    </View>
                    <Text className="text-white font-medium text-sm">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Efficiency Section */}
        <View className="px-6 mb-12">
          <View className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <View className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full opacity-50" />
            <View className="flex-row items-center mb-4">
              <View className="p-3 bg-green-700 rounded-2xl mr-4 shadow-lg shadow-green-700/30">
                <Feather name="zap" size={24} color="white" />
              </View>
              <Text className="text-2xl font-black text-green-900 leading-tight">Mais Eficiência</Text>
            </View>
            <Text className="text-gray-500 mb-6 font-medium">
              Reduzimos seu tempo de espera com algoritmos inteligentes que calculam a melhor rota em tempo real.
            </Text>
            <TouchableOpacity
              className="bg-green-700 flex-row items-center justify-center py-4 rounded-xl"
              onPress={() => router.push('/escolha-usuario' as any)}
            >
              <Text className="text-white font-black mr-2">COMEÇAR AGORA</Text>
              <Feather name="chevron-right" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center pb-12">
          <Text className="text-gray-300 text-xs">© 2026 Borasiô • São Luís - MA</Text>
        </View>
      </ScrollView>

      {/* Navigation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 backdrop-blur-md justify-end"
          onPress={() => setIsModalOpen(false)}
        >
          <View className="bg-white rounded-t-[40px] px-8 pt-4 pb-12 w-full">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mb-8" />

            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-2xl font-black text-gray-900">Menu Principal</Text>
              <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                <View className="bg-gray-100 p-2 rounded-full">
                  <Feather name="x" size={20} color="#000" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="space-y-4 gap-3">
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center p-4 rounded-2xl ${item.id === "escolha-usuario" ? "bg-green-700 shadow-lg shadow-green-700/20" : "bg-gray-50"
                    }`}
                  onPress={() => handleMenuPress(item.id)}
                >
                  <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${item.id === "escolha-usuario" ? "bg-white/20" : "bg-white border border-gray-100"
                    }`}>
                    <Feather name={item.icon} size={20} color={item.id === "escolha-usuario" ? "white" : "#064e3b"} />
                  </View>
                  <Text className={`font-black text-lg ${item.id === "escolha-usuario" ? "text-white" : "text-gray-800"
                    }`}>
                    {item.label}
                  </Text>
                  <View className="flex-1" />
                  <Feather name="chevron-right" size={20} color={item.id === "escolha-usuario" ? "white" : "#d1d5db"} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
