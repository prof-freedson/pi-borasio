"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRulerCombined,
  faCreditCard,
  faCheckCircle,
  faStar,
  faCommentDots,
  faEnvelope,
  faPhone,
  faIdCard,
  faCar,
  faMapMarkerAlt,
  faIdBadge,
  faUser,
  faCarSide,
  faPalette,
  faGasPump,
  faChair,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function MotoristaContent() {
  const [modoEdicao, setModoEdicao] = useState(false);

  const [nome, setNome] = useState("João Ribamar");
  const [email, setEmail] = useState("joaoribamar@gmail.com");
  const [telefone, setTelefone] = useState("(98) 98745-3629");
  const [cnh, setCnh] = useState("12345678900");

  const [marca, setMarca] = useState("Volkswagen");
  const [modelo, setModelo] = useState("Gol");
  const [placa, setPlaca] = useState("ABC1D23");
  const [cor, setCor] = useState("Prata");
  const [combustivel, setCombustivel] = useState("Flex");
  const [assentos, setAssentos] = useState(5);
  const [arCondicionado, setArCondicionado] = useState(true);

  const [corridas, setCorridas] = useState([
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
    // Validação dos campos pessoais (usa import dinâmica do Sentry para não quebrar SSR)
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
    // Validação dos campos do veículo
    if (!marca || !/^[A-Za-zÀ-ÿ\s]+$/.test(marca)) {
      const errMsg = "Marca inválida. Use apenas letras.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!modelo) {
      const errMsg = "Modelo do veículo é obrigatório.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!cor || !/^[A-Za-zÀ-ÿ\s]+$/.test(cor)) {
      const errMsg = "Cor inválida. Use apenas letras.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!combustivel) {
      const errMsg = "Combustível é obrigatório.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!assentos || isNaN(Number(assentos)) || Number(assentos) < 1) {
      const errMsg = "Assentos deve ser um número maior que zero.";
      window.alert(errMsg);
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(new Error(errMsg)));
      return;
    }
    setModoEdicao(false);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DAF3D7] to-[#B8E1B3] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Cabeçalho Perfil */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src="https://lmmobilidade.com.br/lmveiculosapps/wp-content/uploads/sites/4/2023/03/Ativo-2.png"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#FFD700] shadow-md"
                alt="Foto do motorista"
              />
              <div className="absolute bottom-0 right-0 bg-[#004d2b] text-white rounded-full px-3 py-1 text-xs font-bold">
                Motorista
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#004d2b]">{nome}</h1>
              <p className="text-gray-600 mt-1">Membro desde Abril 2024</p>

              <div className="mt-4 flex justify-center md:justify-start">
                <Link
                  href="/corridas"
                  className="bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] px-6 py-3 rounded-xl font-bold flex items-center transition-colors shadow-md"
                >
                  <FontAwesomeIcon icon={faCar} className="mr-2" />
                  Ver Corridas
                </Link>
              </div>
            </div>
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

            <div className="space-y-4">
              {[
                { label: "Nome", value: nome, setValue: setNome, icon: faUser },
                { label: "Telefone", value: telefone, setValue: setTelefone, icon: faPhone },
                { label: "E-mail", value: email, setValue: setEmail, icon: faEnvelope },
                { label: "CNH", value: cnh, setValue: setCnh, icon: faIdCard },
              ].map(({ label, value, setValue, icon }, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="flex items-center text-gray-600 text-sm">
                    <FontAwesomeIcon icon={icon} className="mr-2 text-[#004d2b] w-4" />
                    {label}
                  </label>
                  {modoEdicao ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (label === "Telefone") {
                          val = val.replace(/\D/g, "");
                          val = val.replace(/^(\d{2})(\d)/, "($1) $2");
                          val = val.replace(/(\d{5})(\d)/, "$1-$2");
                          setValue(val.slice(0, 15));
                        } else if (label === "CNH") {
                          val = val.replace(/\D/g, "");
                          setValue(val.slice(0, 11));
                        } else {
                          setValue(val);
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d2b] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-700">{value}</p>
                  )}
                </div>
              ))}

              {modoEdicao && (
                <div className="flex gap-3 pt-2">
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
        </div>

        {/* Veículo */}
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

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Marca", value: marca, setValue: setMarca, icon: faCarSide },
                { label: "Modelo", value: modelo, setValue: setModelo, icon: faCar },
                { label: "Placa", value: placa, setValue: setPlaca, icon: faIdBadge },
                { label: "Cor", value: cor, setValue: setCor, icon: faPalette },
                { label: "Combustível", value: combustivel, setValue: setCombustivel, icon: faGasPump },
                { label: "Assentos", value: String(assentos), setValue: (v: string) => setAssentos(Number(v)), icon: faChair },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <label className="flex items-center text-gray-600 text-sm">
                    <FontAwesomeIcon icon={item.icon} className="mr-2 text-[#004d2b] w-4" />
                    {item.label}
                  </label>
                  {modoEdicao ? (
                    <input
                      type={item.label === "Assentos" ? "number" : "text"}
                      value={item.value}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (item.label === "Placa") {
                          value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
                        }
                        item.setValue(value as any);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d2b] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-700">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corridas Online */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-xl font-bold text-[#004d2b] mb-4">Corridas Online</h1>
            <div className="flex gap-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">Ligar</button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg">Desligar</button>
            </div>
          </div>
        </div>

        {/* Últimas Corridas */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faClock} className="text-[#004d2b] mr-2" />
              <h1 className="text-xl font-bold text-[#004d2b]">Últimas Corridas</h1>
            </div>

            <div className="space-y-4">
              {corridas.map((corrida, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{corrida.passageiro}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 mr-1" />
                        {corrida.localViagem} → {corrida.destino}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{corrida.valor}</p>
                      <p className="text-sm text-gray-500">{corrida.data}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-black">
                    <p className="mt-2">
                      <FontAwesomeIcon icon={faClock} className="mr-2 text-green-800" />
                      <strong>Duração:</strong> {corrida.duracao}
                    </p>
                    <p className="mt-2">
                      <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-green-800" />
                      <strong>Distância:</strong> {corrida.distancia}
                    </p>
                    <p className="mt-2">
                      <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-green-800" />
                      <strong>Pagamento:</strong> {corrida.pagamento}
                    </p>
                    <p className="mt-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-800" />
                      <strong>Status:</strong> {corrida.status}
                    </p>
                    <p className="mt-2">
                      <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
                      <strong>Classificação:</strong> {corrida.classificacao}
                    </p>
                    <p className="mt-2">
                      <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-green-800" />
                      <strong>Comentários:</strong> {corrida.comentarios}
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 mt-3">
                    <button onClick={denunciarCorrida} className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center">
                      <FontAwesomeIcon icon={faTimes} className="mr-1" />
                      Denunciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
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
