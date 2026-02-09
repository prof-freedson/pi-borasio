'use client';

import { ChevronLeft, MapPin, Clock, AlertTriangle, Car, Construction, Users, Thermometer, Zap, Activity, Info, Navigation, Bell } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

export default function TempoRealPage() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [isClient, setIsClient] = useState(false);

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
    setIsClient(true);
  }, []);

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
      case 'baixo': return 'bg-green-100 text-green-700 border-green-200';
      case 'moderado': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'alto': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const gerarRelatorioPDF = () => {
    const doc = new jsPDF();
    const now = new Date();
    const dataFormatada = now.toLocaleDateString('pt-BR');
    const horaFormatada = now.toLocaleTimeString('pt-BR');

    // Cabeçalho institucional
    doc.setFillColor(0, 77, 43); // Verde BoraSiô
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('BORASIÔ', 20, 22);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório de Monitoramento Urbano (SLZ)', 20, 32);
    
    doc.setFontSize(9);
    doc.text(`${dataFormatada} | ${horaFormatada}`, 160, 28);

    // Seção de Status Global
    doc.setTextColor(0, 77, 43);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Status do Sistema', 20, 60);
    
    doc.setDrawColor(0, 77, 43);
    doc.line(20, 63, 190, 63);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Fluidez Global das Vias: 78%`, 20, 75);
    doc.text(`Tempo Médio de Deslocamento: 22 minutos`, 20, 82);
    doc.text(`Condição Geral: Operação Normal`, 20, 89);

    // Rotas Monitoradas
    doc.setTextColor(0, 77, 43);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Monitoramento de Rotas Ativas', 20, 110);
    doc.line(20, 113, 190, 113);
    
    let y = 125;
    trafficData.routes.forEach((route) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${route.name.toUpperCase()}`, 20, y);
      
      const [r, g, b] = route.congestion === 'leve' ? [0, 128, 0] : route.congestion === 'moderado' ? [180, 150, 0] : [200, 0, 0];
      doc.setTextColor(r, g, b);
      doc.text(`Status: ${route.congestion.toUpperCase()} (${route.time})`, 140, y);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Trajeto: ${route.from} ate Centro Histórico`, 25, y + 6);
      doc.text(`Distância: ${route.distance}`, 25, y + 12);
      
      y += 25;
    });

    // Alertas Ativos
    if (y > 230) {
      doc.addPage();
      y = 30;
    } else {
      y += 10;
    }

    doc.setTextColor(0, 77, 43);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Alertas e Incidentes Críticos', 20, y);
    doc.line(20, y + 3, 190, y + 3);
    
    y += 15;
    trafficData.incidents.forEach((incident) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 0, 0); // Vermelho para alertas
      doc.text(`[${incident.severity.toUpperCase()}] ${incident.location}`, 20, y);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(`Descrição: ${incident.description}`, 25, y + 6);
      doc.text(`Horário: ${incident.time}`, 25, y + 12);
      
      y += 22;
    });

    // Rodapé
    const pageCount = doc.internal.pages.length - 1;
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('© 2024 BoraSiô - Sistema de Inteligência em Mobilidade Urbana de São Luís', 105, 285, { align: 'center' });
        doc.text(`Página ${i} de ${pageCount}`, 190, 285, { align: 'right' });
    }

    doc.save(`Borasio_Relatorio_Trafego_${dataFormatada.replace(/\//g, '-')}.pdf`);
  };

  const MapComponent = () => {
    if (!isClient) return <div className="h-full w-full flex items-center justify-center font-black text-[#004d2b] animate-pulse">CARREGANDO MAPA...</div>;
    const currentCoords = trafficData.routes[selectedRoute]?.coords || 'Sao+Luis,MA';
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31888.621779999998!2d-44.30!3d-2.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${currentCoords}!5e0!3m2!1spt-BR!2sbr!4v1706622542456!5m2!1spt-BR!2sbr&q=${currentCoords}`;
    return (
      <iframe
        key={selectedRoute}
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      />
    );
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      {/* Header Premium */}
      <header className="bg-[#004d2b] text-white py-6 px-4 md:px-8 border-b border-white/5 sticky top-0 z-[100] shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/transito-inteligente" className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-white/10">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Zap size={20} className="text-[#004d2b] fill-[#004d2b]" />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">Tráfego ao vivo</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-green-900/50 border border-green-700 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-300">Ao Vivo: {trafficData.lastUpdate}</span>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Coluna da Esquerda: Rotas & Mapa */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Mapa Card */}
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white relative h-[450px] group transition-all duration-500 hover:shadow-green-500/10">
              <MapComponent />
              <button className="absolute top-6 right-6 bg-[#004d2b] text-white p-3 rounded-2xl hover:scale-110 transition-all shadow-xl">
                 <Navigation size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Legenda abaixo do mapa */}
            <div className="flex flex-wrap items-center justify-center gap-8 py-4 px-8 bg-white/50 rounded-full border border-green-100 max-w-fit mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm shadow-green-500/20"></div>
                <span className="text-[10px] font-black text-[#004d2b] uppercase tracking-widest">Leve</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/20"></div>
                <span className="text-[10px] font-black text-[#004d2b] uppercase tracking-widest">Moderado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm shadow-red-500/20"></div>
                <span className="text-[10px] font-black text-[#004d2b] uppercase tracking-widest">Parado</span>
              </div>
            </div>

            {/* Grid de Rotas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trafficData.routes.map((route, index) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(index)}
                  className={`text-left p-6 rounded-[2.5rem] border-2 transition-all duration-500 relative group overflow-hidden ${
                    selectedRoute === index
                    ? 'border-[#004d2b] bg-white shadow-xl -translate-y-1'
                    : 'border-white bg-white/60 hover:border-green-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-2xl transition-all ${
                       selectedRoute === index ? 'bg-[#004d2b] text-white' : 'bg-green-100 text-[#004d2b]'
                     }`}>
                        <Activity size={20} />
                     </div>
                     <span className={`text-xl font-black ${selectedRoute === index ? 'text-[#004d2b]' : 'text-gray-400'}`}>
                       {route.time}
                     </span>
                  </div>
                  <h4 className="font-black text-[#004d2b] mb-1 uppercase text-xs tracking-widest">{route.name}</h4>
                  <p className="text-sm font-medium text-gray-500 mb-4">{route.from} → Centro</p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{route.distance}</span>
                     <div className={`w-3 h-3 rounded-full ${getCongestionColor(route.congestion)} shadow-sm shadow-black/10`}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Alertas & Stats */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Alertas Section */}
            <div className="bg-[#004d2b] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-[40px]"></div>
               <div className="flex items-center gap-3 mb-8">
                  <div className="bg-yellow-400 p-2 rounded-xl text-[#004d2b]">
                     <Bell size={18} fill="#004d2b" />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tighter">Alertas Ativos</h2>
               </div>

               <div className="space-y-4">
                  {trafficData.incidents.map((incident, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/5 p-5 rounded-3xl space-y-3 hover:bg-white/15 transition-all">
                       <div className="flex justify-between items-center">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${getSeverityStyles(incident.severity)}`}>
                            {incident.severity}
                          </span>
                          <span className="text-[10px] font-bold opacity-40">{incident.time}</span>
                       </div>
                       <h4 className="font-black text-sm text-yellow-400 leading-tight">{incident.location}</h4>
                       <p className="text-xs text-green-100/60 font-medium leading-relaxed">{incident.description}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-green-50 text-center">
               <h3 className="text-xs font-black text-[#004d2b] uppercase tracking-[0.2em] mb-8">Status Global</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                     <p className="text-2xl font-black text-[#004d2b]">78%</p>
                     <p className="text-[8px] font-bold text-green-600 uppercase">Fluidez</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                     <p className="text-2xl font-black text-[#004d2b]">22m</p>
                     <p className="text-[8px] font-bold text-yellow-600 uppercase">Média</p>
                  </div>
               </div>
               <button 
                onClick={gerarRelatorioPDF}
                className="w-full mt-6 bg-green-50 hover:bg-green-100 text-[#004d2b] py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
              >
                  Gerar Relatório
               </button>
            </div>

            {/* Dica Local Info */}
            <div className="bg-yellow-400 p-6 rounded-[2.5rem] flex items-center gap-4 shadow-xl shadow-yellow-400/10">
               <div className="bg-[#004d2b] p-3 rounded-2xl text-white">
                  <Info size={18} />
               </div>
               <p className="text-[10px] font-black text-[#004d2b] uppercase leading-tight tracking-wider">
                  Evite a Holandeses entre <span className="underline decoration-2 underline-offset-2">17h e 19h</span>
               </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}