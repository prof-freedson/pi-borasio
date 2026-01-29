import { Clock, CheckCircle, Lock } from "lucide-react";
import React from "react";

interface Route {
  id: number;
  origin: string;
  destination: string;
  time: string;
  price: string;
}

interface RouteItemProps {
  route: Route;
  isSelected: boolean;
  isReserved: boolean;
  onSelect: () => void;
  onReserve: () => void;
}

export default function RouteItem({
  route,
  isSelected,
  isReserved,
  onSelect,
  onReserve,
}: RouteItemProps) {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
        isSelected
          ? "bg-green-50 border-[#004d2b] shadow-md"
          : "bg-gray-50 border-transparent hover:bg-green-50"
      } ${isReserved ? "border-green-500 bg-green-50" : ""}`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-[#004d2b]">{route.origin}</h4>
          <p className="text-sm text-gray-600">para {route.destination}</p>
        </div>
        <span className="font-bold text-[#004d2b] text-lg">{route.price}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{route.time}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReserve();
          }}
          disabled={isReserved}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
            isReserved
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-[#004d2b] text-white hover:bg-[#006d3b]"
          }`}
        >
          {isReserved ? (
            <>
              <CheckCircle className="w-3 h-3" />
              Selecionado
            </>
          ) : (
            <>
              <Lock className="w-3 h-3" />
              Selecionar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
