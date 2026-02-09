import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faCar, faIdBadge, faPalette, faGasPump, faChair } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface VehicleInfoField {
  label: string;
  value: string;
  setValue: (value: string) => void;
  icon: any;
  type?: string;
}

interface VehicleInfoProps {
  fields: VehicleInfoField[];
  isEditing: boolean;
}

export default function VehicleInfoSection({ fields, isEditing }: VehicleInfoProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {fields.map((item, index) => (
        <div key={index} className="space-y-1">
          <label className="flex items-center text-gray-600 text-sm">
            <FontAwesomeIcon icon={item.icon} className="mr-2 text-[#004d2b] w-4" />
            {item.label}
          </label>
          {isEditing ? (
            <input
              type={item.type || "text"}
              value={item.value}
              onChange={(e) => {
                let value = e.target.value;
                if (item.label === "Placa") {
                  value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
                }
                item.setValue(value);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d2b] focus:border-transparent"
            />
          ) : (
            <p className="text-gray-700">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
