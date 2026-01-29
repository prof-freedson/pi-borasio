"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faStar,
  faCar,
  faUsers,
  faEdit,
  faUser,
  faPhone,
  faEnvelope,
  faIdCard,
  faCarSide,
  faCreditCard,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import * as Sentry from "@sentry/nextjs";

// Importar componentes compartilhados
import { PageHeader } from "@/app/components/shared";
import {
  DriverProfileHeader,
  PersonalInfoSection,
  VehicleInfoSection,
  LatestRidesSection,
} from "@/app/components/motorista";

interface Ride {
  passageiro: string;
  localViagem: string;
  destino: string;
  valor: string;
  data: string;
  duracao: string;
  distancia: string;
  pagamento: string;
  status: string;
  classificacao: string;
  comentarios: string;
}

function MotoristaContent() {
  const [modoEdicao, setModoEdicao] = useState(false);

  // Dados Pessoais
  const [nome, setNome] = useState("João Ribamar");
  const [email, setEmail] = useState("joaoribamar@gmail.com");
  const [telefone, setTelefone] = useState("(98) 98745-3629");
  const [cnh, setCnh] = useState("12345678900");

  // Dados do Veículo
  const [marca, setMarca] = useState("Volkswagen");
  const [modelo, setModelo] = useState("Gol");
  const [placa, setPlaca] = useState("ABC1D23");
  const [cor, setCor] = useState("Prata");
  const [combustivel, setCombustivel] = useState("Flex");
  const [assentos, setAssentos] = useState(5);

  const [corridas, setCorridas] = useState<Ride[]>([
    {
      passageiro: "Maria Souza",
      localViagem: "Avenida Brasil, 345",
      destino: "Rua do Sol, 890",
      valor: "R$ 25,00",
      data: "2025-04-20 10:30",
      duracao: "15 min",
      distancia: "8 km",
      pagamento: "Cartão",
      status: "Concluída",
      classificacao: "4.8",
      comentarios: "Viagem tranquila e rápida.",
    },
    {
      passageiro: "Pedro Oliveira",
      localViagem: "Rua da Paz, 123",
      destino: "Praça da Liberdade, 456",
      valor: "R$ 30,00",
      data: "2025-04-20 11:00",
      duracao: "20 min",
      distancia: "12 km",
      pagamento: "Dinheiro",
      status: "Concluída",
      classificacao: "4.5",
      comentarios: "Motorista muito educado.",
    },
    {
      passageiro: "Ana Costa",
      localViagem: "Avenida Independência, 678",
      destino: "Shopping Central, 123",
      valor: "R$ 40,00",
      data: "2025-04-20 12:00",
      duracao: "30 min",
      distancia: "15 km",
      pagamento: "Cartão",
      status: "Concluída",
      classificacao: "5.0",
      comentarios: "Ótimo serviço!",
    },
  ]);

  const denunciarCorrida = () => {
    alert("Corrida denunciada!");
  };

  const salvarEdicao = () => {
    // Validação
    if (!nome || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      const errMsg = "Nome inválido. Use apenas letras e espaços.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!cnh || !/^\d{11}$/.test(cnh.replace(/\D/g, ""))) {
      const errMsg = "CNH inválida. Deve conter 11 dígitos numéricos.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!telefone || !/^\d{8,}$/.test(telefone.replace(/\D/g, ""))) {
      const errMsg = "Telefone inválido. Deve conter pelo menos 8 dígitos numéricos.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      const errMsg = "E-mail inválido.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }

    setModoEdicao(false);
    alert("Perfil atualizado com sucesso!");
  };

  // Fields para PersonalInfoSection
  const personalInfoFields = [
    { label: "Nome", value: nome, setValue: setNome, icon: faUser },
    { label: "Telefone", value: telefone, setValue: setTelefone, icon: faPhone },
    { label: "E-mail", value: email, setValue: setEmail, icon: faEnvelope },
    { label: "CNH", value: cnh, setValue: setCnh, icon: faIdCard },
  ];

  // Fields para VehicleInfoSection
  const vehicleFields = [
    { label: "Marca", value: marca, setValue: setMarca, icon: faCarSide },
    { label: "Modelo", value: modelo, setValue: setModelo, icon: faCar },
    { label: "Placa", value: placa, setValue: setPlaca, icon: faCarSide },
    { label: "Cor", value: cor, setValue: setCor, icon: faCarSide },
    { label: "Combustível", value: combustivel, setValue: setCombustivel, icon: faCarSide },
    { label: "Assentos", value: String(assentos), setValue: (v: string) => setAssentos(Number(v)), icon: faCarSide, type: "number" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DAF3D7] to-[#B8E1B3] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <PageHeader
          title="Painel do Motorista"
          subtitle="Gerencie seu perfil e corridas"
          showBackButton={true}
          backHref="/"
        />

        {/* Perfil do Motorista */}
        <DriverProfileHeader
          name={nome}
          memberSince="Abril 2024"
          profileImage="https://lmmobilidade.com.br/lmveiculosapps/wp-content/uploads/sites/4/2023/03/Ativo-2.png"
          editButtonVisible={!modoEdicao}
        />

        {/* Botões de Ação Rápida */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/corridas"
              className="bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md"
            >
              <FontAwesomeIcon icon={faCar} className="mr-2" />
              Ver Corridas
            </Link>
            <Link
              href="/oferecer-carona"
              className="bg-[#004d2b] hover:bg-[#003320] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Oferecer Carona
            </Link>
          </div>
        </div>

        {/* Informações da Conta */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-[#004d2b]">Informações da Conta</h1>
              {!modoEdicao && (
                <button
                  onClick={() => setModoEdicao(true)}
                  className="text-[#004d2b] hover:text-[#003320] font-medium flex items-center"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Editar
                </button>
              )}
            </div>

            <PersonalInfoSection fields={personalInfoFields} isEditing={modoEdicao} />

            {modoEdicao && (
              <div className="flex gap-3 pt-6">
                <button
                  onClick={salvarEdicao}
                  className="flex-1 bg-[#004d2b] hover:bg-[#003320] text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={() => setModoEdicao(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Informações do Veículo */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-[#004d2b]">Veículo</h1>
              {!modoEdicao && (
                <button
                  onClick={() => setModoEdicao(true)}
                  className="text-[#004d2b] hover:text-[#003320] font-medium flex items-center"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Editar
                </button>
              )}
            </div>

            <VehicleInfoSection fields={vehicleFields} isEditing={modoEdicao} />
          </div>
        </div>

        {/* Corridas Online */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-xl font-bold text-[#004d2b] mb-4">Corridas Online</h1>
            <div className="flex gap-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
                Ligar
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg">
                Desligar
              </button>
            </div>
          </div>
        </div>

        {/* Últimas Corridas */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-xl font-bold text-[#004d2b] mb-6">Últimas Corridas</h1>
            <LatestRidesSection corridas={corridas} onReport={denunciarCorrida} />
          </div>
        </div>

        {/* Botões de Ação Final */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contato"
            className="bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md"
          >
            <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
            Falar com Passageiro
          </Link>
          <Link
            href="/feedback"
            className="bg-[#004d2b] hover:bg-[#003320] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md"
          >
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            Registrar Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Motorista() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <MotoristaContent />
    </Suspense>
  );
}
