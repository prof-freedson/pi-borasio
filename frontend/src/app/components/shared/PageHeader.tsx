import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  showBackButton = true, 
  backHref = "/" 
}: PageHeaderProps) {
  return (
    <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {showBackButton && (
          <Link href={backHref} className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
          {title}
        </h1>
        <div className="w-8"></div>
      </div>
      {subtitle && (
        <p className="text-center text-yellow-300 mt-2 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  );
}
