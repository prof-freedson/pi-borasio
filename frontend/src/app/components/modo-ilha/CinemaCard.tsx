import { Navigation } from "lucide-react";
import React from "react";

interface Cinema {
  id: number;
  rideId: number;
  name: string;
  location: string;
  movies: string[];
  parking: string;
  hours: string;
}

interface CinemaCardProps {
  cinema: Cinema;
  onRequestRide: (rideId: number) => void;
}

export default function CinemaCard({ cinema, onRequestRide }: CinemaCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
      <h4 className="text-lg font-bold text-[#004d2b] mb-2">{cinema.name}</h4>
      <p className="text-gray-600 mb-3">{cinema.location}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Horário:</span>
          <span className="font-semibold">{cinema.hours}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estacionamento:</span>
          <span className="font-semibold">{cinema.parking}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {cinema.movies.map((movie, index) => (
          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {movie}
          </span>
        ))}
      </div>

      <button
        onClick={() => onRequestRide(cinema.rideId)}
        className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
      >
        <Navigation className="w-4 h-4" />
        Pedir Corrida
      </button>
    </div>
  );
}
