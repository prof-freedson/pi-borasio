'use client';

import { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaGoogle,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCarSide
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
        
        
        <div className="flex flex-col items-start justify-between space-y-8">
          
          
          <div className="flex items-center space-x-4">
            <FaCarSide className="text-green-800 text-5xl" />
            <h2 className="text-3xl font-bold text-green-900">BoraSiô!</h2>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Localização</h3>
            <div className="flex items-start space-x-2 text-[#4e4e4e]">
              <FaMapMarkerAlt className="mt-1" />
              <p>
                Avenida dos Holandeses, 500<br />
                Bairro Ponta D'Areia, São Luís - MA 65075-000
              </p>
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Siga-nos</h3>
            <div className="flex space-x-4 text-[#393838] text-2xl">
              <a href="#" className="hover:text-green-700">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-green-700">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-green-700">
                <FaGoogle />
              </a>
              <a
                href="https://wa.me/5581999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-700"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">© 2025 Política de privacidade</p>
        </div>

        
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
              className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}