import { Navigation } from "lucide-react";
import React from "react";

interface Market {
  id: number;
  rideId: number;
  name: string;
  location: string;
  bestTime: string;
  days: string;
  products: string[];
  parking: string;
}

interface MarketCardProps {
  market: Market;
  onRequestRide: (rideId: number) => void;
}

export default function MarketCard({ market, onRequestRide }: MarketCardProps) {
  return (
    <div className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-[#004d2b] mb-2">{market.name}</h3>
      <p className="text-gray-600 mb-3">{market.location}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Melhor horário:</span>
          <span className="font-semibold">{market.bestTime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Dias:</span>
          <span className="font-semibold">{market.days}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estacionamento:</span>
          <span className="font-semibold">{market.parking}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {market.products.map((product, index) => (
          <span key={index} className="bg-white text-[#004d2b] text-xs px-2 py-1 rounded border">
            {product}
          </span>
        ))}
      </div>

      <button
        onClick={() => onRequestRide(market.rideId)}
        className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
      >
        <Navigation className="w-4 h-4" />
        Pedir Corrida
      </button>
    </div>
  );
}
