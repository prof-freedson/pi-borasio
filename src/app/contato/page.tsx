'use client';

import { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaGoogle,
  FaWhatsapp,
  FaTiktok,
  FaMapMarkerAlt,
  FaApple,
  FaGooglePlay
} from 'react-icons/fa';

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviado:', form);
  };

  return (
    <div className="min-h-screen bg-green-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-8">
        
        {/* Lado esquerdo - Informações de contato */}
        <div className="flex flex-col items-start justify-between space-y-8">
          
          {/* Título sem ícone */}
          <h2 className="text-3xl font-bold text-green-900">BoraSiô</h2>

          {/* Localização, E-mail e WhatsApp */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Localização</h3>
            <div className="flex items-start space-x-2 text-[#4e4e4e] mb-4">
              <FaMapMarkerAlt className="mt-1 text-green-700" />
              <p>
                Avenida dos Holandeses, 500<br />
                Bairro Ponta D'Areia, São Luís - MA 65075-000
              </p>
            </div>

            <div className="flex items-start space-x-2 text-[#4e4e4e] mb-2">
              <FaGoogle className="mt-1 text-green-700" />
              <p>contato@borasio.com</p>
            </div>

            <div className="flex items-start space-x-2 text-[#4e4e4e]">
              <FaWhatsapp className="mt-1 text-green-700" />
              <p>(98) 99999-9999</p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Siga-nos</h3>
            <div className="flex space-x-4 text-[#393838] text-2xl">
              <a href="https://facebook.com" className="hover:text-green-700">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" className="hover:text-green-700">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com" className="hover:text-green-700">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Baixe nosso aplicativo (Agora abaixo de "Siga-nos") */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Baixe nosso aplicativo</h3>
            <p className="text-gray-700 text-center mb-4 text-sm">
              Disponível para Android e iOS. Aproveite nossos recursos exclusivos!
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="flex items-center space-x-2 hover:opacity-80 transition">
                <FaGooglePlay className="text-2xl text-green-800" />
                <span className="text-sm text-green-800">Google Play</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:opacity-80 transition">
                <FaApple className="text-2xl text-green-800" />
                <span className="text-sm text-green-800">App Store</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">© 2025 Política de privacidade</p>
        </div>

        {/* Lado direito - Formulário */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-3">Quer falar com a gente?</h2>
          <p className="text-[#4e4e4e] text-sm sm:text-base md:text-lg mb-8 mt-1">
            Envie sua mensagem no formulário abaixo:
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Digite um e-mail válido"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <textarea
              name="mensagem"
              placeholder="Digite sua mensagem"
              rows={4}
              value={form.mensagem}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}