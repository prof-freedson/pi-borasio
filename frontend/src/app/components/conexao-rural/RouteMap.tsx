import React from "react";
import { Clock, CheckCircle } from "lucide-react";

interface RouteMapProps {
  selectedRoute: number | null;
  routes: any[];
  locations: any;
}

export default function RouteMap({ selectedRoute, routes, locations }: RouteMapProps) {
  const selectedRouteData = routes.find((r: any) => r.id === selectedRoute);

  return (
    <div className="w-full h-full bg-green-50 rounded-lg border-2 border-green-200 relative overflow-hidden">
      {/* Fundo do mapa estilizado */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-50 opacity-60"></div>

      {/* Grade de fundo simulando um mapa */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-green-300"
            style={{ top: `${i * 10}%` }}
          ></div>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-green-300"
            style={{ left: `${i * 10}%` }}
          ></div>
        ))}
      </div>

      {/* Terminais - posicionados à direita */}
      <div className="absolute right-4 top-4">
        <div className="flex flex-col gap-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
            <h4 className="font-bold text-red-600 text-sm mb-2">TERMINAIS</h4>
            {Object.values(locations.terminais).map((terminal: any) => (
              <div key={terminal.name} className="flex items-center gap-2 mb-1">
                <div
                  className={`w-3 h-3 bg-red-500 rounded-full ${
                    selectedRouteData?.toCoords.name === terminal.name
                      ? "ring-2 ring-red-300 animate-pulse"
                      : ""
                  }`}
                ></div>
                <span className="text-xs font-medium">{terminal.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zona Rural - posicionados à esquerda */}
      <div className="absolute left-4 top-4">
        <div className="flex flex-col gap-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
            <h4 className="font-bold text-green-700 text-sm mb-2">ZONA RURAL</h4>
            {Object.values(locations.zonaRural).map((rural: any) => (
              <div key={rural.name} className="flex items-center gap-2 mb-1">
                <div
                  className={`w-3 h-3 bg-green-600 rounded-full ${
                    selectedRouteData?.fromCoords.name === rural.name
                      ? "ring-2 ring-green-300 animate-pulse"
                      : ""
                  }`}
                ></div>
                <span className="text-xs font-medium">{rural.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Todas as rotas disponíveis - linhas cinzas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-4/5 h-4/5">
          {routes.map((route, index) => {
            const fromX = 20 + (index * 15);
            const toX = 80 - (index * 15);
            return (
              <div
                key={route.id}
                className={`absolute h-1 rounded-full transition-all duration-300 ${
                  selectedRoute === route.id
                    ? "bg-[#004d2b] z-10 animate-pulse"
                    : "bg-gray-300 opacity-50"
                }`}
                style={{
                  top: `${30 + (index * 10)}%`,
                  left: `${fromX}%`,
                  width: `${toX - fromX}%`,
                }}
              ></div>
            );
          })}

          {/* Pontos de origem (verde) */}
          {routes.map((route, index) => (
            <div
              key={`from-${route.id}`}
              className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                selectedRoute === route.id
                  ? "bg-green-600 ring-2 ring-green-300 z-20 animate-pulse"
                  : "bg-green-400"
              }`}
              style={{
                top: `${30 + (index * 10)}%`,
                left: `${20 + (index * 15)}%`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          ))}

          {/* Pontos de destino (vermelho) */}
          {routes.map((route, index) => (
            <div
              key={`to-${route.id}`}
              className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                selectedRoute === route.id
                  ? "bg-red-500 ring-2 ring-red-300 z-20 animate-pulse"
                  : "bg-red-400"
              }`}
              style={{
                top: `${30 + (index * 10)}%`,
                left: `${80 - (index * 15)}%`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Informações da rota selecionada ou instruções */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-green-200">
        {selectedRouteData ? (
          <>
            <h4 className="font-bold text-[#004d2b] text-center">
              {selectedRouteData.origin} → {selectedRouteData.destination}
            </h4>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedRouteData.time}
              </span>
              <span className="flex items-center gap-1">💰 {selectedRouteData.price}</span>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            <p className="font-semibold">💡 Como usar o mapa:</p>
            <p className="text-sm mt-1">Clique em uma rota à esquerda para visualizar os detalhes</p>
          </div>
        )}
      </div>
    </div>
  );
}
