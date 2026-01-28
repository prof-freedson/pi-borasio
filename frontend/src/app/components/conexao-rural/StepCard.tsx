import React from "react";

interface StepProps {
  number: number;
  title: string;
  description: string;
}

export default function StepCard({ number, title, description }: StepProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto bg-[#004d2b] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-[#004d2b] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
