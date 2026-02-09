import Link from "next/link";
import React from "react";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title,
  subtitle,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
}: CTASectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-green-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        {subtitle && <p className="text-xl mb-8">{subtitle}</p>}

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={primaryButtonHref}
            className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
          >
            {primaryButtonLabel}
          </Link>
          {secondaryButtonLabel && secondaryButtonHref && (
            <Link
              href={secondaryButtonHref}
              className="border border-white text-white hover:bg-white hover:text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {secondaryButtonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
