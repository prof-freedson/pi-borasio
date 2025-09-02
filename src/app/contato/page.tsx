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
import Image from 'next/image'; // Importe o componente Image do Next.js

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [errors, setErrors] = useState({ nome: '', email: '', mensagem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpa o erro quando o usuário começa a digitar
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { nome: '', email: '', mensagem: '' };

    if (!form.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    }

    if (!form.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setForm({ nome: '', email: '', mensagem: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 px-4 sm:px-8 md:px-16 flex flex-col">
      {/* Elementos decorativos com padrões maranhenses */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,20 Q40,5 60,20 T100,20 Q85,40 100,60 T100,100 Q80,85 60,100 T20,100 Q35,80 20,60 T20,20" 
                fill="#004d2b" />
        </svg>
      </div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 my-10 md:my-20 mx-auto relative overflow-hidden">
        
        {/* Detalhe decorativo no canto */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 Q25,30 0,60 Q30,75 0,100 Q50,80 100,100 Q75,50 100,0 Q50,25 0,0" 
                  fill="#004d2b" />
          </svg>
        </div>
        
        {/* Lado esquerdo - Informações de contato */}
        <div className="flex flex-col items-start justify-between space-y-8 z-10">
          
          {/* Cabeçalho com logo e saudação maranhense */}
          <div className="w-full">
            <div className="flex items-center mb-2">
              {/* Logo do BoraSiô - substituindo o círculo BS */}
              <div className="w-16 h-16 mr-3 flex items-center justify-center">
                <Image
                  src="/img/borasio.jpg" // Caminho para a imagem da logo
                  alt="Logo BoraSiô"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">BoraSiô</h2>
            </div>
            <p className="text-amber-700 italic font-light mt-2">
              "Vambora conversar? É só chamar!"
            </p>
          </div>

          {/* Localização, E-mail e WhatsApp */}
          <div className="w-full">
            <h3 className="text-xl font-semibold text-green-800 mb-4 sm:text-2xl flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
              Onde a gente fica
            </h3>
            <div className="flex items-start space-x-3 text-gray-700 mb-5 p-3 bg-green-50 rounded-lg border border-green-100">
              <FaMapMarkerAlt className="mt-1 text-green-700 flex-shrink-0 text-lg" />
              <p>
                Avenida dos Holandeses, 500<br />
                Bairro Ponta D'Areia, São Luís - MA 65075-000
              </p>
            </div>

            <div className="flex items-start space-x-3 text-gray-700 mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
              <FaGoogle className="mt-1 text-green-700 flex-shrink-0 text-lg" />
              <a href="mailto:contato@borasio.com" className="hover:text-green-700 transition">contato@borasio.com</a>
            </div>

            <div className="flex items-start space-x-3 text-gray-700 p-3 bg-green-50 rounded-lg border border-green-100">
              <FaWhatsapp className="mt-1 text-green-700 flex-shrink-0 text-lg" />
              <a href="https://wa.me/5598999999999" className="hover:text-green-700 transition">(98) 99999-9999</a>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="w-full">
            <h3 className="text-xl font-semibold text-green-800 mb-4 sm:text-2xl flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
              Bora seguir nós?
            </h3>
            <div className="flex space-x-4 text-gray-700 text-2xl bg-green-50 p-4 rounded-lg border border-green-100">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-green-700 transition-transform hover:scale-110 p-2 bg-white rounded-full shadow-sm">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-green-700 transition-transform hover:scale-110 p-2 bg-white rounded-full shadow-sm">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-green-700 transition-transform hover:scale-110 p-2 bg-white rounded-full shadow-sm">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Baixe nosso aplicativo */}
          <div className="w-full mt-6 bg-gradient-to-r from-green-100 to-amber-100 p-5 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-3 text-center sm:text-2xl">
              Baixe nosso aplicativo
            </h3>
            <p className="text-gray-700 text-center mb-4 text-sm sm:text-base">
              Já pensou em chamá um BoraSiô pelo celular? É rapidim!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="#" 
                className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 transition px-4 py-3 rounded-lg shadow-sm border border-green-200"
                aria-label="Download no Google Play"
              >
                <FaGooglePlay className="text-xl text-green-800" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Disponível no</div>
                  <div className="text-sm font-medium text-green-800">Google Play</div>
                </div>
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 transition px-4 py-3 rounded-lg shadow-sm border border-green-200"
                aria-label="Download na App Store"
              >
                <FaApple className="text-xl text-green-800" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Baixe na</div>
                  <div className="text-sm font-medium text-green-800">App Store</div>
                </div>
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8 self-center">
            © 2025 BoraSiô. Todos os direitos reservados. <a href="#" className="hover:text-green-700">Política de privacidade</a>
          </p>
        </div>

        {/* Lado direito - Formulário */}
        <div className="text-center z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-900 mb-2 sm:text-4xl">Manda um alô pra gente!</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Tem dúvida, sugestão ou elogio? É só mandar! A gente adora conversar.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 text-left bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-green-800 mb-1">
                Seu nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Como a gente pode te chamá?"
                value={form.nome}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.nome ? 'border-red-500' : 'border-green-200'} focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition`}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "nome-error" : undefined}
              />
              {errors.nome && <p id="nome-error" className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-800 mb-1">
                Seu e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="pra gente retorná o contato"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-green-200'} focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-green-800 mb-1">
                Sua mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                placeholder="Fala com a gente..."
                rows={4}
                value={form.mensagem}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.mensagem ? 'border-red-500' : 'border-green-200'} focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition`}
                aria-invalid={!!errors.mensagem}
                aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
              ></textarea>
              {errors.mensagem && <p id="mensagem-error" className="text-red-500 text-sm mt-1">{errors.mensagem}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition font-semibold shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : 'Manda ver!'}
            </button>
          </form>
          
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg mt-4 text-left border border-green-200">
              ✅ <strong>Oba!</strong> Mensagem enviada com sucesso! A gente retorna em breve.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg mt-4 text-left border border-red-200">
              ❌ <strong>Ih!</strong> Deu um probleminha. Tenta de novo mais tarde, tá bom?
            </div>
          )}
          
          {/* Elemento decorativo no rodapé do formulário */}
          <div className="mt-6 text-xs text-gray-500 italic">
            A gente responde rapidim, pode confiá!
          </div>
        </div>
      </div>
    </div>
  );
}