import Link from "next/link";
import React, { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  imageAlt?: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  children?: ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
  children,
}: HeroSectionProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#004d2b] to-green-700 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg sm:text-xl mb-6">{subtitle}</p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href={primaryButtonHref}
              className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              {primaryButtonLabel}
            </Link>
            {secondaryButtonLabel && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-colors border border-white"
              >
                {secondaryButtonLabel}
              </Link>
            )}
          </div>

          {children}
        </div>

        {imageUrl && (
          <div className="md:w-1/2 flex justify-center">
            <img
              src={imageUrl}
              alt={imageAlt || "Hero image"}
              className="w-full max-w-[300px] md:max-w-[350px] rounded-lg shadow-xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}
