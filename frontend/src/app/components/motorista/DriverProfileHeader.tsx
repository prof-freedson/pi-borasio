import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface DriverProfileHeaderProps {
  name: string;
  memberSince: string;
  profileImage: string;
  onEditClick?: () => void;
  editButtonVisible: boolean;
}

interface ActionButton {
  label: string;
  href: string;
  icon: IconDefinition;
  color: "yellow" | "green";
}

export default function DriverProfileHeader({
  name,
  memberSince,
  profileImage,
  onEditClick,
  editButtonVisible,
}: DriverProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative">
        <img
          src={profileImage}
          className="w-32 h-32 rounded-full object-cover border-4 border-[#FFD700] shadow-md"
          alt="Foto do motorista"
        />
        <div className="absolute bottom-0 right-0 bg-[#004d2b] text-white rounded-full px-3 py-1 text-xs font-bold">
          Motorista
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold text-[#004d2b]">{name}</h1>
        <p className="text-gray-600 mt-1">Membro desde {memberSince}</p>
      </div>
    </div>
  );
}
