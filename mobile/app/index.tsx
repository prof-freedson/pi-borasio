import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Modal, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import "../global.css";

const { width } = Dimensions.get('window');

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
};

export default function App() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<ScrollView>(null);

  const carouselContent = [
    {
      image: "https://images.unsplash.com/photo-1565514020176-6c2235c8e8b0?q=80&w=1000&auto=format&fit=crop", // Bus/Transit inspired
      title: "Mobilidade com Jeito Maranhense",
      subtitle: "Um app de carona mais humano, mais seguro e mais local.",
    },
    {
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop", // Carpooling
      title: "Economize tempo e dinheiro",
      subtitle: "Compartilhe caronas e reduza seus custos de transporte diário.",
    },
    {
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop", // Driving
      title: "Segurança em primeiro lugar",
      subtitle: "Motoristas verificados e recursos de segurança para sua tranquilidade.",
    },
    {
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop", // Road trip
      title: "Conectando a cidade",
      subtitle: "Rotas inteligentes que abrangem toda a região metropolitana de São Luís.",
    },
  ];

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % carouselContent.length;
      setCurrentSlide(nextSlide);
      flatListRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    flatListRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const regionalContent = {
    title: "Foco Regional",
    desc: "Nosso aplicativo foi desenvolvido especialmente para atender às necessidades únicas de mobilidade urbana em São Luís.",
    details: [
      "Rotas otimizadas para a ilha",
      "Cobertura para bairros periféricos",
      "Integração com terminais",
      "Atendimento prioritário"
    ],
    icon: "map-pin" as const,
  };

  const efficiencyContent = {
    title: "Eficiência Borasiô",
    desc: "Projetado para oferecer a melhor experiência em mobilidade urbana com máxima eficiência.",
    details: [
      "Tempo de espera reduzido",
      "Algoritmos inteligentes",
      "Economia de custos",
      "Motoristas verificados"
    ],
    icon: "trending-up" as const,
  };

  const linkItems: BenefitItem[] = [
    {
      title: "transito-inteligente",
      displayTitle: "Trânsito Inteligente",
      desc: "Rotas otimizadas para vias congestionadas",
      icon: "terminal",
      isLink: true,
    },
    {
      title: "eventos-culturais",
      displayTitle: "Eventos Culturais",
      desc: "Cobertura especial para festas locais",
      icon: "calendar",
      isLink: true,
    },
    {
      title: "modo-ilha",
      displayTitle: "Modo Ilha",
      desc: "Conexão entre bairros com rotas inteligentes",
      icon: "wifi",
      isLink: true,
    },
    {
      title: "corrida-em-grupo",
      displayTitle: "Corrida em Grupo",
      desc: "Compartilhe e economize",
      icon: "users",
      isLink: true,
    },
  ];

  const menuItems: MenuItem[] = [
    { id: "", label: "Início" },
    { id: "sobre", label: "Sobre" },
    { id: "contato", label: "Contato" },
    { id: "pessoal/login", label: "Login" },
    { id: "escolha-usuario", label: "Cadastrar" },
    { id: "resetar-senha", label: "Resetar Senha" },
  ];

  const handleMenuPress = (id: string) => {
    setIsModalOpen(false);
    if (id !== "") {
      router.push(`/${id}` as any);
    }
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== currentSlide) {
      setCurrentSlide(roundIndex);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">

        {/* Carousel Section */}
        <View className="relative h-96">
          <ScrollView
            ref={flatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScroll}
            scrollEventThrottle={16}
          >
            {carouselContent.map((item, index) => (
              <View key={index} style={{ width, height: 384 }} className="relative">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/40" />
                <View className="absolute inset-0 flex items-center justify-center px-6">
                  <Text className="text-3xl font-bold text-white text-center mb-4">
                    {item.title}
                  </Text>
                  <Text className="text-lg text-white text-center mb-8">
                    {item.subtitle}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsModalOpen(true)}
                    className="bg-[#004d2b] flex-row items-center px-6 py-3 rounded-lg"
                  >
                    <Feather name="zap" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Saiba mais</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-2 gap-2">
            {carouselContent.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white scale-125" : "bg-white/50"
                  }`}
              />
            ))}
          </View>
        </View>

        {/* Introduction */}
        <View className="px-6 py-10 items-center">
          <Text className="text-2xl font-bold text-[#004d2b] text-center mb-4">
            Uma Solução para São Luís
          </Text>
          <Text className="text-gray-600 text-center text-base">
            Descubra como o Borasiô transforma a mobilidade urbana na Ilha do Amor.
          </Text>
        </View>

        {/* Foco Regional Section */}
        <View className="px-4 mb-8">
          <View className="bg-green-700 rounded-xl p-6 shadow-md mb-4">
            <View className="flex-row items-center mb-4 gap-2">
              <Feather name={regionalContent.icon} size={24} color="#fde047" />
              <Text className="text-xl font-bold text-yellow-300">
                {regionalContent.title}
              </Text>
            </View>
            <Text className="text-white mb-4">{regionalContent.desc}</Text>
            {regionalContent.details.map((detail, idx) => (
              <View key={idx} className="flex-row items-center mb-2 gap-2">
                <Feather name="check-circle" size={16} color="#fde047" />
                <Text className="text-white text-sm">{detail}</Text>
              </View>
            ))}
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop" }}
            className="w-full h-48 rounded-xl"
          />
        </View>

        {/* Eficiência Section */}
        <View className="px-4 mb-8">
          <View className="bg-green-800 rounded-xl p-6 shadow-md mb-4">
            <View className="flex-row items-center mb-4 gap-2">
              <Feather name={efficiencyContent.icon} size={24} color="#fde047" />
              <Text className="text-xl font-bold text-yellow-300">
                {efficiencyContent.title}
              </Text>
            </View>
            <Text className="text-white mb-4">{efficiencyContent.desc}</Text>
            {efficiencyContent.details.map((detail, idx) => (
              <View key={idx} className="flex-row items-center mb-2 gap-2">
                <Feather name="check-circle" size={16} color="#fde047" />
                <Text className="text-white text-sm">{detail}</Text>
              </View>
            ))}
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=600&auto=format&fit=crop" }}
            className="w-full h-48 rounded-xl"
          />
        </View>

        {/* Features Grid */}
        <View className="px-4 pb-12">
          <Text className="text-2xl font-bold text-[#004d2b] text-center mb-8">
            Funcionalidades Inovadoras
          </Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {linkItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-gray-100 items-center justify-between"
                onPress={() => router.push(`/${item.title}` as any)}
              >
                <View className="bg-green-100 p-3 rounded-full mb-3">
                  <Feather name={item.icon} size={24} color="#004d2b" />
                </View>
                <Text className="text-[#004d2b] font-bold text-center mb-2 text-sm">
                  {item.displayTitle}
                </Text>
                <Text className="text-xs text-gray-500 text-center" numberOfLines={3}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-white rounded-lg w-full max-w-sm p-6 relative">
            <TouchableOpacity
              className="absolute top-4 right-4 z-10"
              onPress={() => setIsModalOpen(false)}
            >
              <Feather name="x" size={24} color="gray" />
            </TouchableOpacity>

            <Text className="text-xl font-bold text-[#004d2b] text-center mb-2">
              Por onde quer começar?
            </Text>
            <Text className="text-gray-500 text-center mb-6">
              Escolha uma seção para navegar
            </Text>

            <View className="space-y-2 gap-2">
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="w-full py-3 px-4 bg-gray-50 hover:bg-green-50 rounded-lg"
                  onPress={() => handleMenuPress(item.id)}
                >
                  <Text className="text-gray-800 font-medium">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
