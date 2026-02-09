import { Star, MapPin } from "lucide-react";
import { Navigation } from "lucide-react";
import React from "react";

interface Beach {
  id: number;
  rideId: number;
  name: string;
  description: string;
  rating: number;
  bestTime: string;
  parking: string;
  facilities: string[];
}

interface BeachCardProps {
  beach: Beach;
  onRequestRide: (rideId: number) => void;
}

export default function BeachCard({ beach, onRequestRide }: BeachCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-[#004d2b]">{beach.name}</h3>
            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{beach.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{beach.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Melhor horário:</span>
              <span className="font-semibold">{beach.bestTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estacionamento:</span>
              <span className="font-semibold">{beach.parking}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {beach.facilities.map((facility, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {facility}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => onRequestRide(beach.rideId)}
            className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Pedir Corrida
          </button>
        </div>
      </div>
    </div>
  );
}
