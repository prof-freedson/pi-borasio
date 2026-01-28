import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faEnvelope, faIdCard } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface PersonalInfoField {
  label: string;
  value: string;
  setValue: (value: string) => void;
  icon: any;
}

interface PersonalInfoProps {
  fields: PersonalInfoField[];
  isEditing: boolean;
}

export default function PersonalInfoSection({ fields, isEditing }: PersonalInfoProps) {
  return (
    <div className="space-y-4">
      {fields.map(({ label, value, setValue, icon }, idx) => (
        <div key={idx} className="space-y-1">
          <label className="flex items-center text-gray-600 text-sm">
            <FontAwesomeIcon icon={icon} className="mr-2 text-[#004d2b] w-4" />
            {label}
          </label>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => {
                let val = e.target.value;
                if (label === "Telefone") {
                  val = val.replace(/\D/g, "");
                  val = val.replace(/^(\d{2})(\d)/, "($1) $2");
                  val = val.replace(/(\d{5})(\d)/, "$1-$2");
                  setValue(val.slice(0, 15));
                } else if (label === "CNH") {
                  val = val.replace(/\D/g, "");
                  setValue(val.slice(0, 11));
                } else {
                  setValue(val);
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d2b] focus:border-transparent"
            />
          ) : (
            <p className="text-gray-700">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
