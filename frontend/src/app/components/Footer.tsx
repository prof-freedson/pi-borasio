'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#004d2b] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Logo Bora Siô"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-green-100/70 text-sm leading-relaxed">
              Conectando pessoas e transformando a mobilidade urbana na Grande São Luís com segurança, economia e o calor do povo maranhense.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-400 hover:text-[#004d2b] transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-400 hover:text-[#004d2b] transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-400 hover:text-[#004d2b] transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-yellow-400">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-green-100/70 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/sobre" className="text-green-100/70 hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="text-green-100/70 hover:text-white transition-colors">Contato</Link></li>
              <li><Link href="/download" className="text-green-100/70 hover:text-white transition-colors font-semibold">Baixar App</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-yellow-400">Serviços</h4>
            <ul className="space-y-4">
              <li><Link href="/transito-inteligente" className="text-green-100/70 hover:text-white transition-colors">Trânsito Inteligente</Link></li>
              <li><Link href="/corrida-em-grupo" className="text-green-100/70 hover:text-white transition-colors">Corrida em Grupo</Link></li>
              <li><Link href="/modo-ilha" className="text-green-100/70 hover:text-white transition-colors">Modo Ilha</Link></li>
              <li><Link href="/eventos-culturais" className="text-green-100/70 hover:text-white transition-colors">Eventos Culturais</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-yellow-400">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-green-100/70">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm">São Luís, Maranhão - Brasil</span>
              </li>
              <li className="flex items-center gap-3 text-green-100/70">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm">(98) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-green-100/70">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm">contato@borasio.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-green-100/40">
          <p>&copy; {currentYear} BoraSiô. Todos os direitos reservados. Senac 2026.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
