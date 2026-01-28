import React, { ReactNode } from "react";

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  title: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  background?: "white" | "green";
}

export default function FeaturesGrid({
  title,
  features,
  columns = 4,
  background = "white",
}: FeaturesGridProps) {
  const gridClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const bgClass = background === "white" ? "bg-white" : "bg-green-50";
  const sectionBg = background === "white" ? "bg-green-50" : "bg-white";

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
          {title}
        </h2>

        <div className={`grid ${gridClass[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${bgClass} rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow`}
            >
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#004d2b] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
