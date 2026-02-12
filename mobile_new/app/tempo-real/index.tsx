
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Linking, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import "../../global.css";

export default function TempoRealPage() {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [trafficData, setTrafficData] = useState({
    lastUpdate: 'Há 2 minutos',
    routes: [
      {
        id: 1,
        name: 'Rota Principal - Via Centro',
        from: 'Terminal Cohama',
        to: 'Centro Histórico',
        time: '25 min',
        distance: '8,2 km',
        congestion: 'moderado',
        incidents: ['Obra na pista', 'Trânsito moderado'],
        coords: 'Centro+Historico,Sao+Luis,MA'
      },
      {
        id: 2,
        name: 'Alternativa - Via Holandeses',
        from: 'Terminal Cohama',
        to: 'Centro Histórico',
        time: '18 min',
        distance: '9,5 km',
        congestion: 'leve',
        incidents: ['Trânsito livre'],
        coords: 'Av.+dos+Holandeses,Sao+Luis,MA'
      },
      {
        id: 3,
        name: 'Curta - Via São Francisco',
        from: 'Terminal Cohama',
        to: 'Centro Histórico',
        time: '22 min',
        distance: '7,8 km',
        congestion: 'intenso',
        incidents: ['Manifestação na via', 'Trânsito parado'],
        coords: 'Ponte+do+Sao+Francisco,Sao+Luis,MA'
      }
    ],
    incidents: [
      {
        type: 'accident',
        location: 'Av. Daniel de La Touche',
        description: 'Acidente próximo ao Shopping - trânsito lento',
        severity: 'alto',
        time: 'Há 15 min'
      },
      {
        type: 'construction',
        location: 'Av. dos Holandeses, km 3.5',
        description: 'Obra de recapeamento - faixa interditada',
        severity: 'moderado',
        time: 'Desde 08:00'
      },
      {
        type: 'event',
        location: 'Praça de Eventos - Centro',
        description: 'Evento cultural - trânsito desviado',
        severity: 'baixo',
        time: 'Até 22:00'
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => ({ ...prev, lastUpdate: 'Agora mesmo' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'leve': return 'bg-green-500';
      case 'moderado': return 'bg-yellow-500';
      case 'intenso': return 'bg-orange-500';
      case 'parado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'baixo': return 'bg-green-100 border-green-200';
      case 'moderado': return 'bg-yellow-100 border-yellow-200';
      case 'alto': return 'bg-red-100 border-red-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const getSeverityTextColors = (severity: string) => {
      switch (severity) {
        case 'baixo': return 'text-green-700';
        case 'moderado': return 'text-yellow-700';
        case 'alto': return 'text-red-700';
        default: return 'text-gray-700';
      }
  }

  const gerarRelatorioPDF = async () => {
    try {
        const now = new Date();
        const dataFormatada = now.toLocaleDateString('pt-BR');
        const horaFormatada = now.toLocaleTimeString('pt-BR');

        const htmlContent = `
        <html>
            <head>
                <style>
                    body { font-family: Helvetica, sans-serif; padding: 20px; }
                    .header { background-color: #004d2b; color: white; padding: 20px; text-align: center; }
                    .title { font-size: 24px; font-weight: bold; }
                    .subtitle { font-size: 14px; margin-top: 10px; }
                    .section-title { color: #004d2b; font-size: 18px; font-weight: bold; border-bottom: 2px solid #004d2b; margin-top: 20px; padding-bottom: 5px; }
                    .item { margin-bottom: 15px; }
                    .item-title { font-weight: bold; font-size: 14px; }
                    .item-detail { font-size: 12px; color: #555; }
                    .status-leve { color: green; }
                    .status-moderado { color: orange; }
                    .status-intenso { color: red; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="title">BORASIÔ</div>
                    <div class="subtitle">Relatório de Monitoramento Urbano (SLZ)<br/>${dataFormatada} | ${horaFormatada}</div>
                </div>

                <div class="section-title">Status do Sistema</div>
                <p>Fluidez Global das Vias: 78%</p>
                <p>Tempo Médio de Deslocamento: 22 minutos</p>
                <p>Condição Geral: Operação Normal</p>

                <div class="section-title">Monitoramento de Rotas Ativas</div>
                ${trafficData.routes.map(route => `
                    <div class="item">
                        <div class="item-title">${route.name.toUpperCase()} - <span class="status-${route.congestion}">${route.congestion.toUpperCase()}</span> (${route.time})</div>
                        <div class="item-detail">Trajeto: ${route.from} até Centro Histórico | Distância: ${route.distance}</div>
                    </div>
                `).join('')}

                <div class="section-title">Alertas e Incidentes Críticos</div>
                ${trafficData.incidents.map(incident => `
                    <div class="item">
                        <div class="item-title" style="color:red">[${incident.severity.toUpperCase()}] ${incident.location}</div>
                        <div class="item-detail">${incident.description} (${incident.time})</div>
                    </div>
                `).join('')}
                
                <div style="text-align: center; color: #999; font-size: 10px; margin-top: 50px;">
                    © 2024 BoraSiô - Sistema de Inteligência em Mobilidade Urbana de São Luís
                </div>
            </body>
        </html>
        `;

        await Print.printAsync({
            html: htmlContent,
        });
    } catch (error) {
        Alert.alert("Erro", "Não foi possível gerar o relatório.");
    }
  };

  const openMap = () => {
      const currentCoords = trafficData.routes[selectedRoute]?.coords || 'Sao+Luis,MA';
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${currentCoords}`;
      Linking.openURL(mapUrl);
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <ScrollView className="flex-1">
          {/* Header Premium */}
          <View className="bg-[#004d2b] py-6 px-4 border-b border-white/5 shadow-xl">
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={() => router.back()} className="flex-row items-center bg-white/10 px-3 py-1.5 rounded-xl">
                <Feather name="chevron-left" size={20} color="white" />
                <Text className="text-white font-medium ml-1">Voltar</Text>
              </TouchableOpacity>
              
              <View className="flex-row items-center bg-green-900/50 border border-green-700 px-3 py-1 rounded-full">
                <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <Text className="text-[10px] uppercase font-bold text-green-300">Ao Vivo: {trafficData.lastUpdate}</Text>
              </View>
            </View>

            <View className="flex-row items-center">
                <View className="bg-yellow-400 p-2 rounded-lg mr-3">
                  <Feather name="zap" size={24} color="#004d2b" />
                </View>
                <Text className="text-xl font-black text-white uppercase tracking-tight">Tráfego ao vivo</Text>
            </View>
          </View>

          <View className="p-4">
            
            {/* Mapa Card */}
            <View className="bg-white rounded-[2rem] shadow-sm overflow-hidden border-4 border-white h-64 mb-6 relative justify-center items-center bg-gray-100">
                <Feather name="map-pin" size={48} color="#004d2b" />
                <Text className="text-[#004d2b] font-bold mt-2">Visualização do Mapa</Text>
                <TouchableOpacity 
                    onPress={openMap}
                    className="absolute bottom-4 right-4 bg-[#004d2b] p-3 rounded-xl shadow-lg"
                >
                    <Feather name="navigation" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Legenda */}
            <View className="flex-row flex-wrap justify-center gap-4 bg-white/50 p-3 rounded-full border border-green-100 mb-6 self-center">
                <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-green-500 mr-1.5" />
                    <Text className="text-[10px] font-black text-[#004d2b] uppercase">Leve</Text>
                </View>
                <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5" />
                    <Text className="text-[10px] font-black text-[#004d2b] uppercase">Moderado</Text>
                </View>
                <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-red-500 mr-1.5" />
                    <Text className="text-[10px] font-black text-[#004d2b] uppercase">Parado</Text>
                </View>
            </View>

            {/* Rotas */}
            <View className="mb-8">
                {trafficData.routes.map((route, index) => (
                    <TouchableOpacity
                        key={route.id}
                        onPress={() => setSelectedRoute(index)}
                        className={`mb-4 p-5 rounded-[2rem] border-2 transition-all ${
                            selectedRoute === index 
                            ? 'border-[#004d2b] bg-white shadow-lg' 
                            : 'border-white bg-white/60'
                        }`}
                    >
                        <View className="flex-row justify-between items-start mb-3">
                            <View className={`p-2 rounded-xl ${selectedRoute === index ? 'bg-[#004d2b]' : 'bg-green-100'}`}>
                                <Feather name="activity" size={18} color={selectedRoute === index ? 'white' : '#004d2b'} />
                            </View>
                            <Text className={`text-lg font-black ${selectedRoute === index ? 'text-[#004d2b]' : 'text-gray-400'}`}>
                                {route.time}
                            </Text>
                        </View>
                        <Text className="font-black text-[#004d2b] mb-1 uppercase text-xs tracking-widest">{route.name}</Text>
                        <Text className="text-sm font-medium text-gray-500 mb-3">{route.from} → Centro</Text>
                        
                        <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{route.distance}</Text>
                            <View className={`w-3 h-3 rounded-full ${getCongestionColor(route.congestion)}`} />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="mb-6">
                 {/* Alertas Section */}
                <View className="bg-[#004d2b] p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden mb-6">
                    <View className="flex-row items-center gap-3 mb-6">
                        <View className="bg-yellow-400 p-2 rounded-xl">
                            <Feather name="bell" size={16} color="#004d2b" />
                        </View>
                        <Text className="text-lg font-black text-white uppercase tracking-tighter">Alertas Ativos</Text>
                    </View>

                    <View>
                        {trafficData.incidents.map((incident, i) => (
                            <View key={i} className="bg-white/10 p-4 rounded-2xl mb-3 border border-white/5">
                                <View className="flex-row justify-between items-center mb-2">
                                    <View className={`px-2 py-1 rounded-lg border ${getSeverityStyles(incident.severity)}`}>
                                        <Text className={`text-[8px] font-black uppercase tracking-widest ${getSeverityTextColors(incident.severity)}`}>
                                            {incident.severity}
                                        </Text>
                                    </View>
                                    <Text className="text-[10px] font-bold text-white opacity-40">{incident.time}</Text>
                                </View>
                                <Text className="font-black text-sm text-yellow-400 leading-tight mb-1">{incident.location}</Text>
                                <Text className="text-xs text-green-100 font-medium leading-relaxed opacity-60">{incident.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quick Stats Card */}
                <View className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-green-50 items-center">
                    <Text className="text-xs font-black text-[#004d2b] uppercase tracking-[0.2em] mb-6">Status Global</Text>
                    <View className="flex-row gap-4 mb-6 w-full justify-between">
                        <View className="p-4 bg-green-50 rounded-2xl border border-green-100 flex-1 items-center">
                            <Text className="text-xl font-black text-[#004d2b]">78%</Text>
                            <Text className="text-[8px] font-bold text-green-600 uppercase">Fluidez</Text>
                        </View>
                        <View className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex-1 items-center">
                            <Text className="text-xl font-black text-[#004d2b]">22m</Text>
                            <Text className="text-[8px] font-bold text-yellow-600 uppercase">Média</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress={gerarRelatorioPDF}
                        className="w-full bg-green-50 py-4 rounded-2xl border border-green-100 items-center"
                    >
                        <Text className="font-black text-xs text-[#004d2b] uppercase tracking-widest">
                            Gerar Relatório
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Dica Local Info */}
                <View className="bg-yellow-400 p-5 rounded-[2rem] flex-row items-center gap-4 shadow-lg shadow-yellow-400/10 mt-6">
                    <View className="bg-[#004d2b] p-3 rounded-2xl">
                        <Feather name="info" size={16} color="white" />
                    </View>
                    <Text className="text-[10px] font-black text-[#004d2b] uppercase leading-tight tracking-wider flex-1">
                        Evite a Holandeses entre <Text className="underline font-black">17h e 19h</Text>
                    </Text>
                </View>
            </View>

          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
