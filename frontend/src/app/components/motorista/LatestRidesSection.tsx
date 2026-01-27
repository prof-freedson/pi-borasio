import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRulerCombined,
  faCreditCard,
  faCheckCircle,
  faStar,
  faCommentDots,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

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

interface LatestRidesProps {
  corridas: Ride[];
  onReport?: (rideIndex: number) => void;
}

export default function LatestRidesSection({ corridas, onReport }: LatestRidesProps) {
  return (
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

          <div className="mt-3 text-sm text-black space-y-2">
            <p>
              <FontAwesomeIcon icon={faClock} className="mr-2 text-green-800" />
              <strong>Duração:</strong> {corrida.duracao}
            </p>
            <p>
              <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-green-800" />
              <strong>Distância:</strong> {corrida.distancia}
            </p>
            <p>
              <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-green-800" />
              <strong>Pagamento:</strong> {corrida.pagamento}
            </p>
            <p>
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-800" />
              <strong>Status:</strong> {corrida.status}
            </p>
            <p>
              <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
              <strong>Classificação:</strong> {corrida.classificacao}
            </p>
            <p>
              <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-green-800" />
              <strong>Comentários:</strong> {corrida.comentarios}
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-3">
            {onReport && (
              <button
                onClick={() => onReport(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-1" />
                Denunciar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
