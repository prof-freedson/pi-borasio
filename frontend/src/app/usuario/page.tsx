"use client";

import {
  faClock,
  faCommentDots,
  faCreditCard,
  faEdit,
  faEnvelope,
  faIdBadge,
  faMapMarkerAlt,
  faMoneyBill,
  faPhone,
  faRoute,
  faTimes,
  faUser,
  faCarAlt,
  faStar,
  faReceipt,
  faCheckCircle,
  faBarcode,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function UsuarioContent() {
  const searchParams = useSearchParams();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [selectedCorrida, setSelectedCorrida] = useState<any>(null);
  const [historicoPagamentos, setHistoricoPagamentos] = useState<any[]>([]);

  const [nome, setNome] = useState("Sarah Lima Pereira");
  const [email, setEmail] = useState("Sarah@exemplo.com");
  const [telefone, setTelefone] = useState("(98) 98877-8999");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [endereco, setEndereco] = useState("Rua das Flores, 123 - Centro");

  const [corridasAnteriores, setCorridasAnteriores] = useState([
    {
      origem: "Rua das Flores - Centro",
      destino: "Rua B - Maiobão",
      data: "2025-04-01",
      valor: "R$ 20,00",
    },
    {
      origem: "Rua Primavera - Santa Clara",
      destino: "Rua Outono - Vila Nova",
      data: "2025-04-10",
      valor: "R$ 25,00",
    },
  ]);
  const [corridasAgendadas, setCorridasAgendadas] = useState([
    {
      id: 1,
      origem: "Rua Pinhos - Centro",
      destino: "Rua Olivia - Centro",
      data: "2025-04-20 14:00",
    },
  ]);

  useEffect(() => {
    const corridaSelected = searchParams.get("corridaSelected");
    if (corridaSelected) {
      const storedCorrida = localStorage.getItem("selectedCorrida");
      if (storedCorrida) {
        setSelectedCorrida(JSON.parse(storedCorrida));
        localStorage.removeItem("selectedCorrida");
      }
    }

    // Carregar histórico de pagamentos
    const historico = JSON.parse(localStorage.getItem('historicoPagamentos') || '[]');
    setHistoricoPagamentos(historico);
  }, [searchParams]);

  const salvarEdicao = () => {
    // Validação dos campos
    if (!nome || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      const errMsg = "Nome inválido. Use apenas letras e espaços.";
      window.alert(errMsg);
      import('@sentry/nextjs').then(Sentry => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!cpf || !/^\d{11}$/.test(cpf.replace(/\D/g, ""))) {
      const errMsg = "CPF inválido. Deve conter 11 dígitos numéricos.";
      window.alert(errMsg);
      import('@sentry/nextjs').then(Sentry => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!telefone || !/^\d{8,}$/.test(telefone.replace(/\D/g, ""))) {
      const errMsg = "Telefone inválido. Deve conter pelo menos 8 dígitos numéricos.";
      window.alert(errMsg);
      import('@sentry/nextjs').then(Sentry => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      const errMsg = "E-mail inválido.";
      window.alert(errMsg);
      import('@sentry/nextjs').then(Sentry => Sentry.captureException(new Error(errMsg)));
      return;
    }
    if (!endereco) {
      const errMsg = "Endereço obrigatório.";
      window.alert(errMsg);
      import('@sentry/nextjs').then(Sentry => Sentry.captureException(new Error(errMsg)));
      return;
    }
    setModoEdicao(false);
    alert("Perfil atualizado com sucesso!");
  };

  const cancelarCorrida = (id: number) => {
    setCorridasAgendadas(
      corridasAgendadas.filter((corrida) => corrida.id !== id)
    );
  };

  const confirmarCorrida = () => {
    if (selectedCorrida) {
      const newCorrida = {
        id: Date.now(),
        origem: selectedCorrida.origem,
        destino: selectedCorrida.destino,
        data: new Date().toLocaleString(),
      };
      setCorridasAgendadas([...corridasAgendadas, newCorrida]);
      setSelectedCorrida(null);
    }
  };

  const getMetodoPagamentoIcon = (metodo: string) => {
    switch (metodo) {
      case 'credito':
        return faCreditCard;
      case 'pix':
        return faQrcode;
      case 'boleto':
        return faBarcode;
      default:
        return faMoneyBill;
    }
  };

  const getMetodoPagamentoTexto = (metodo: string) => {
    switch (metodo) {
      case 'credito':
        return 'Cartão de Crédito';
      case 'pix':
        return 'Pix';
      case 'boleto':
        return 'Boleto';
      default:
        return metodo;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DAF3D7] to-[#B8E1B3] p-4 md:p-8">
      {/* Modal de Confirmação */}
      {selectedCorrida && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-[#004d2b] mb-4 border-b pb-2">
              Confirmar Corrida
            </h2>
            <div className="space-y-3 mb-6">
              <p className="flex items-center">
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  className="text-[#FFD700] mr-2 w-5" 
                />
                <span className="font-medium">Origem:</span> {selectedCorrida.origem}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  className="text-[#FFD700] mr-2 w-5" 
                />
                <span className="font-medium">Destino:</span> {selectedCorrida.destino}
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setSelectedCorrida(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <Link
                href="/pagamento"
                className="flex-1 bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                onClick={confirmarCorrida}
              >
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Pagamento
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Container Principal */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src="https://img.freepik.com/fotos-gratis/close-up-na-jovem-empresaria_23-2149153830.jpg?semt=ais_hybrid&w=740"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#FFD700] shadow-md"
                alt="Foto do Usuário"
              />
              <div className="absolute bottom-0 right-0 bg-[#004d2b] text-white rounded-full px-3 py-1 text-xs font-bold">
                Usuário
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
                  <FontAwesomeIcon icon={faCarAlt} className="mr-2" />
                  Pedir Corrida
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Informações da Conta */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-[#004d2b]">
                Informações da Conta
              </h1>
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

            {modoEdicao ? (
              <div className="space-y-4">
                {[
                  { label: "Nome", value: nome, setValue: setNome, icon: faUser },
                  {
                    label: "Telefone",
                    value: telefone,
                    setValue: setTelefone,
                    icon: faPhone,
                  },
                  {
                    label: "E-mail",
                    value: email,
                    setValue: setEmail,
                    icon: faEnvelope,
                  },
                  { label: "CPF", value: cpf, setValue: setCpf, icon: faIdBadge },
                  {
                    label: "Endereço",
                    value: endereco,
                    setValue: setEndereco,
                    icon: faMapMarkerAlt,
                  },
                ].map(({ label, value, setValue, icon }, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="flex items-center text-gray-600 text-sm">
                      <FontAwesomeIcon
                        icon={icon}
                        className="mr-2 text-[#004d2b] w-4"
                      />
                      {label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        let inputValue = e.target.value;
                        if (label === "Telefone") {
                          inputValue = inputValue.replace(/\D/g, "");
                          inputValue = inputValue.replace(/^(\d{2})(\d)/, "($1) $2");
                          inputValue = inputValue.replace(/(\d{5})(\d)/, "$1-$2");
                          setValue(inputValue.slice(0, 15));
                        } else if (label === "CPF") {
                          inputValue = inputValue.replace(/\D/g, "");
                          inputValue = inputValue.replace(/(\d{3})(\d)/, "$1.$2");
                          inputValue = inputValue.replace(/(\d{3})(\d)/, "$1.$2");
                          inputValue = inputValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                          setValue(inputValue.slice(0, 14));
                        } else {
                          setValue(inputValue);
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d2b] focus:border-transparent"
                    />
                  </div>
                ))}
                
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
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: nome, icon: faUser },
                  { label: telefone, icon: faPhone },
                  { label: email, icon: faEnvelope },
                  { label: cpf, icon: faIdBadge },
                  { label: endereco, icon: faMapMarkerAlt },
                ].map(({ label, icon }, idx) => (
                  <div key={idx} className="flex items-start">
                    <FontAwesomeIcon 
                      icon={icon} 
                      className="text-[#004d2b] mr-3 mt-1 w-4" 
                    />
                    <p className="text-gray-700">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid de Corridas e Pagamentos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Corridas Anteriores */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon 
                  icon={faRoute} 
                  className="text-[#004d2b] mr-2" 
                />
                <h1 className="text-xl font-bold text-[#004d2b]">
                  Corridas Anteriores
                </h1>
              </div>
              
              {corridasAnteriores.length > 0 ? (
                <div className="space-y-4">
                  {corridasAnteriores.map((c, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start mb-2">
                        <FontAwesomeIcon 
                          icon={faMapMarkerAlt} 
                          className="text-[#FFD700] mr-3 mt-1 w-4" 
                        />
                        <div>
                          <p className="font-medium">{c.origem}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <FontAwesomeIcon icon={faClock} className="mr-1" />
                            {c.data}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FontAwesomeIcon 
                          icon={faMapMarkerAlt} 
                          className="text-[#FFD700] mr-3 mt-1 w-4" 
                        />
                        <p className="font-medium">{c.destino}</p>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="bg-[#004d2b] text-white px-3 py-1 rounded-full text-sm font-bold">
                          {c.valor}
                        </span>
                        <Link
                          href="/feedback"
                          className="bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] px-3 py-1 rounded-lg text-sm font-medium flex items-center transition-colors"
                        >
                          <FontAwesomeIcon icon={faStar} className="mr-1" />
                          Avaliar
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma corrida anterior registrada
                </div>
              )}
            </div>
          </div>

          {/* Histórico de Pagamentos */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon 
                  icon={faReceipt} 
                  className="text-[#004d2b] mr-2" 
                />
                <h1 className="text-xl font-bold text-[#004d2b]">
                  Histórico de Pagamentos
                </h1>
              </div>
              
              {historicoPagamentos.length > 0 ? (
                <div className="space-y-4">
                  {historicoPagamentos.map((pagamento) => (
                    <div 
                      key={pagamento.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <FontAwesomeIcon 
                            icon={getMetodoPagamentoIcon(pagamento.metodo)} 
                            className="text-[#FFD700] mr-2" 
                          />
                          <span className="font-medium text-[#004d2b]">
                            {getMetodoPagamentoTexto(pagamento.metodo)}
                          </span>
                        </div>
                        <span className="bg-[#004d2b] text-white px-2 py-1 rounded-full text-xs font-bold">
                          R$ {pagamento.valor.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[#FFD700] w-3" />
                          <span><strong>Origem:</strong> {pagamento.origem}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[#FFD700] w-3" />
                          <span><strong>Destino:</strong> {pagamento.destino}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="mr-2 text-[#FFD700] w-3" />
                          <span>{pagamento.data} às {pagamento.hora}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-green-600 text-sm">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                          {pagamento.status}
                        </div>
                        <span className="text-xs text-gray-500">
                          ID: {pagamento.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhum pagamento registrado
                  <p className="text-sm mt-2">Seus pagamentos aparecerão aqui após a confirmação</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Corridas Agendadas */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon 
                icon={faClock} 
                className="text-[#004d2b] mr-2" 
              />
              <h1 className="text-xl font-bold text-[#004d2b]">
                Corridas Agendadas
              </h1>
            </div>
            
            {corridasAgendadas.length > 0 ? (
              <div className="space-y-4">
                {corridasAgendadas.map((c) => (
                  <div 
                    key={c.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start mb-2">
                      <FontAwesomeIcon 
                        icon={faMapMarkerAlt} 
                        className="text-[#FFD700] mr-3 mt-1 w-4" 
                      />
                      <div>
                        <p className="font-medium">{c.origem}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <FontAwesomeIcon icon={faClock} className="mr-1" />
                          {c.data}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start mb-3">
                      <FontAwesomeIcon 
                        icon={faMapMarkerAlt} 
                        className="text-[#FFD700] mr-3 mt-1 w-4" 
                      />
                      <p className="font-medium">{c.destino}</p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button className="text-[#004d2b] hover:text-[#003320] text-sm font-medium flex items-center">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                        Alterar
                      </button>
                      <button
                        onClick={() => cancelarCorrida(c.id)}
                        className="text-[#004d2b] hover:text-[#003320] text-sm font-medium flex items-center"
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-1" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhuma corrida agendada
              </div>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contato"
            className="bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md"
          >
            <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
            Falar com Motorista
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

export default function Usuario() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <UsuarioContent />
    </Suspense>
  );
}