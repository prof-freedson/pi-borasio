"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowLeft,
  faPaperPlane,
  faSmile,
  faFrown,
  faMeh,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("avaliar");
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [corridaSelecionada, setCorridaSelecionada] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [hover, setHover] = useState(0);
  const [enviado, setEnviado] = useState(false);
  const [motorista, setMotorista] = useState({
    nome: "Carlos Silva",
    avaliacao: 4.7,
    totalCorridas: 124,
    foto: "https://img.freepik.com/fotos-gratis/homem-bonito-e-sorridente-posiciona-no-estudio_23-2148184625.jpg?w=740",
  });

  // Simular corridas anteriores do usuário
  const corridasAnteriores = [
    {
      id: 1,
      origem: "Rua das Flores - Centro",
      destino: "Rua B - Maiobão",
      data: "2025-04-01 14:30",
      valor: "R$ 20,00",
      motorista: "Carlos Silva",
      motoristaFoto: "https://img.freepik.com/fotos-gratis/homem-bonito-e-sorridente-posiciona-no-estudio_23-2148184625.jpg?w=740",
      motoristaAvaliacao: 4.7,
      motoristaCorridas: 124,
    },
    {
      id: 2,
      origem: "Rua Primavera - Santa Clara",
      destino: "Rua Outono - Vila Nova",
      data: "2025-04-10 09:15",
      valor: "R$ 25,00",
      motorista: "Ana Santos",
      motoristaFoto: "https://img.freepik.com/fotos-gratis/mulher-jovem-e-elegante-posa-no-estudio_23-2148193953.jpg?w=740",
      motoristaAvaliacao: 4.9,
      motoristaCorridas: 89,
    },
  ];

  // Carregar avaliações salvas
  useEffect(() => {
    const savedAvaliacoes = localStorage.getItem("avaliacoes");
    if (savedAvaliacoes) {
      setAvaliacoes(JSON.parse(savedAvaliacoes));
    }
  }, []);

  // Selecionar uma corrida para avaliar
  const selecionarCorrida = (corrida: any) => {
    setCorridaSelecionada(corrida);
    setMotorista({
      nome: corrida.motorista,
      avaliacao: corrida.motoristaAvaliacao,
      totalCorridas: corrida.motoristaCorridas,
      foto: corrida.motoristaFoto,
    });
    setActiveTab("avaliar");
  };

  // Enviar avaliação
  const enviarAvaliacao = () => {
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação com as estrelas.");
      return;
    }

    const novaAvaliacao = {
      id: Date.now(),
      corrida: corridaSelecionada,
      rating,
      comentario,
      data: new Date().toLocaleString(),
    };

    const novasAvaliacoes = [...avaliacoes, novaAvaliacao];
    setAvaliacoes(novasAvaliacoes);
    localStorage.setItem("avaliacoes", JSON.stringify(novasAvaliacoes));

    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setCorridaSelecionada(null);
      setRating(0);
      setComentario("");
      setActiveTab("minhas");
    }, 2000);
  };

  // Renderizar estrelas de avaliação
  const renderStars = (avaliacao: number, tamanho = "text-2xl") => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`${tamanho} ${
                starValue <= avaliacao
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          );
        })}
      </div>
    );
  };

  // Obter texto de acordo com a avaliação
  const getAvaliacaoTexto = (nota: number) => {
    if (nota === 5) return "Excelente";
    if (nota >= 4) return "Ótimo";
    if (nota >= 3) return "Bom";
    if (nota >= 2) return "Regular";
    return "Ruim";
  };

  // Obter ícone de acordo com a avaliação
  const getAvaliacaoIcone = (nota: number) => {
    if (nota === 5) return faSmile;
    if (nota >= 4) return faSmile;
    if (nota >= 3) return faSmile;
    if (nota >= 2) return faMeh;
    return faFrown;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DAF3D7] to-[#B8E1B3] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <Link
            href="/usuario"
            className="bg-white p-3 rounded-full shadow-md mr-4 hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-[#004d2b]" />
          </Link>
          <h1 className="text-2xl font-bold text-[#004d2b]">Avaliações e Feedback</h1>
        </div>

        {/* Abas */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 font-medium ${
                activeTab === "avaliar"
                  ? "text-[#004d2b] border-b-2 border-[#004d2b]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("avaliar")}
            >
              Avaliar Corrida
            </button>
            <button
              className={`flex-1 py-4 font-medium ${
                activeTab === "minhas"
                  ? "text-[#004d2b] border-b-2 border-[#004d2b]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("minhas")}
            >
              Minhas Avaliações
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div className="p-6">
            {activeTab === "avaliar" && (
              <div>
                <h2 className="text-xl font-bold text-[#004d2b] mb-4">
                  {corridaSelecionada
                    ? "Avaliar esta corrida"
                    : "Selecione uma corrida para avaliar"}
                </h2>

                {!corridaSelecionada ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Selecione uma corrida abaixo para avaliar o motorista e o serviço.
                    </p>
                    {corridasAnteriores.map((corrida) => (
                      <div
                        key={corrida.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => selecionarCorrida(corrida)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              De: {corrida.origem}
                            </p>
                            <p className="font-medium">
                              Para: {corrida.destino}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              {corrida.data} • {corrida.valor}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Motorista</div>
                            <div className="font-medium">{corrida.motorista}</div>
                            {renderStars(corrida.motoristaAvaliacao, "text-sm")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Modal de sucesso */}
                    {enviado && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl text-center">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 text-5xl mb-4"
                          />
                          <h3 className="text-xl font-bold text-[#004d2b] mb-2">
                            Avaliação Enviada!
                          </h3>
                          <p className="text-gray-600">
                            Obrigado por compartilhar sua experiência.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={motorista.foto}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                          alt="Motorista"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{motorista.nome}</h3>
                          <div className="flex items-center">
                            {renderStars(motorista.avaliacao)}
                            <span className="ml-2 text-gray-600">
                              {motorista.avaliacao} • {motorista.totalCorridas} corridas
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setCorridaSelecionada(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Alterar corrida
                      </button>
                    </div>

                    <div className="text-center py-4">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <button
                              key={index}
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHover(starValue)}
                              onMouseLeave={() => setHover(0)}
                              className="mx-1 focus:outline-none"
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                className={`text-4xl ${
                                  starValue <= (hover || rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                } transition-colors`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={getAvaliacaoIcone(rating)}
                          className={`text-2xl mr-2 ${
                            rating === 5
                              ? "text-green-600"
                              : rating >= 4
                              ? "text-green-500"
                              : rating >= 3
                              ? "text-blue-500"
                              : rating >= 2
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        />
                        <span className="text-lg font-medium">
                          {rating > 0 ? getAvaliacaoTexto(rating) : "Selecione uma avaliação"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Comentário (opcional)
                      </label>
                      <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Conte como foi sua experiência..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d2b] focus:border-transparent h-32"
                      />
                    </div>

                    <button
                      onClick={enviarAvaliacao}
                      disabled={rating === 0}
                      className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center transition-colors ${
                        rating === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#004d2b] hover:bg-[#003320] text-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Enviar Avaliação
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "minhas" && (
              <div>
                <h2 className="text-xl font-bold text-[#004d2b] mb-4">
                  Minhas Avaliações
                </h2>

                {avaliacoes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FontAwesomeIcon icon={faStar} className="text-4xl text-gray-300 mb-3" />
                    <p>Você ainda não fez nenhuma avaliação.</p>
                    <p className="mt-2">Avalie suas corridas para ajudar outros usuários!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {avaliacoes.map((avaliacao) => (
                      <div
                        key={avaliacao.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium">
                              De: {avaliacao.corrida.origem}
                            </p>
                            <p className="font-medium">
                              Para: {avaliacao.corrida.destino}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              {avaliacao.corrida.data} • {avaliacao.corrida.valor}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Sua avaliação</div>
                            {renderStars(avaliacao.rating)}
                            <div className="text-xs text-gray-500 mt-1">
                              {avaliacao.data}
                            </div>
                          </div>
                        </div>
                        {avaliacao.comentario && (
                          <div className="bg-gray-50 p-3 rounded-lg mt-2">
                            <p className="text-gray-700">{avaliacao.comentario}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas de Avaliação */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#004d2b] mb-4">Suas Estatísticas de Avaliação</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-[#004d2b]">{avaliacoes.length}</div>
              <div className="text-gray-600">Avaliações realizadas</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-[#004d2b]">
                {avaliacoes.length > 0
                  ? (
                      avaliacoes.reduce((acc, curr) => acc + curr.rating, 0) /
                      avaliacoes.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <div className="text-gray-600">Média de suas avaliações</div>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#004d2b] mb-2">Por que avaliar?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Ajude outros usuários a escolherem os melhores motoristas</li>
            <li>Feedback ajuda os motoristas a melhorarem seus serviços</li>
            <li>Contribua para uma comunidade mais transparente</li>
            <li>Suas opiniões são valiosas para nós</li>
          </ul>
        </div>
      </div>
    </div>
  );
}