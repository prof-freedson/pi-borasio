import { MapPin } from "lucide-react";

export default function CorridasPage() {
  const corridas = [
    {
      id: 1,
      origem: "Terminal Cohama",
      destino: "UFMA",
      assentos: 3,
    },
    {
      id: 2,
      origem: "Monte Castelo",
      destino: "Shopping da Ilha",
      assentos: 2,
    },
  ];

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center gap-6 p-4">
      {corridas.map((corrida) => (
        <div
          key={corrida.id}
          className="bg-white rounded-2xl shadow-md w-full max-w-md overflow-hidden"
        >
          <div className="bg-green-900 text-white text-center py-4 text-2xl font-bold">
            BoraSiô!
          </div>

          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-green-900">
              <MapPin className="w-6 h-6" />
              <div className="w-1 h-4 bg-green-900" />
              <MapPin className="w-6 h-6 fill-green-900" />
            </div>
            <div className="flex flex-col gap-2 text-green-900 font-semibold">
              <span>Origem: {corrida.origem}</span>
              <span>Destino: {corrida.destino}</span>
            </div>
          </div>

          <div className="border-t border-green-200 px-6 py-4 flex items-center justify-between text-green-900">
            <span>{corrida.assentos} assentos disponíveis</span>
            <button className="px-4 py-1 border-2 border-green-900 rounded-full hover:bg-green-200 transition">
              selecionar
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
