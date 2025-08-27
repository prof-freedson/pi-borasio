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
    <div className="min-h-screen bg-green-50 px-4 sm:px-8 md:px-16 flex flex-col">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-8 my-10 md:my-20 mx-auto">
        
        {/* Lado esquerdo - Informações de contato */}
        <div className="flex flex-col items-start justify-between space-y-8">
          
          {/* Título com logo */}
          <div className="flex items-center">
            {/* Substitua por um componente de logo real */}
            <div className="w-12 h-12 bg-green-700 rounded-full mr-3 flex items-center justify-center text-white font-bold text-xl">BS</div>
            <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">BoraSiô</h2>
          </div>

          {/* Localização, E-mail e WhatsApp */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3 sm:text-2xl">Localização</h3>
            <div className="flex items-start space-x-2 text-gray-700 mb-4">
              <FaMapMarkerAlt className="mt-1 text-green-700 flex-shrink-0" />
              <p>
                Avenida dos Holandeses, 500<br />
                Bairro Ponta D'Areia, São Luís - MA 65075-000
              </p>
            </div>

            <div className="flex items-start space-x-2 text-gray-700 mb-3">
              <FaGoogle className="mt-1 text-green-700 flex-shrink-0" />
              <a href="mailto:contato@borasio.com" className="hover:text-green-700 transition">contato@borasio.com</a>
            </div>

            <div className="flex items-start space-x-2 text-gray-700">
              <FaWhatsapp className="mt-1 text-green-700 flex-shrink-0" />
              <a href="https://wa.me/5598999999999" className="hover:text-green-700 transition">(98) 99999-9999</a>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3 sm:text-2xl">Siga-nos</h3>
            <div className="flex space-x-4 text-gray-700 text-2xl">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-green-700 transition-transform hover:scale-110">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-green-700 transition-transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-green-700 transition-transform hover:scale-110">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Baixe nosso aplicativo */}
          <div className="w-full mt-6">
            <h3 className="text-xl font-semibold text-green-800 mb-3 text-center sm:text-2xl">Baixe nosso aplicativo</h3>
            <p className="text-gray-700 text-center mb-4 text-sm sm:text-base">
              Disponível para Android e iOS. Aproveite nossos recursos exclusivos!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6">
              <a 
                href="#" 
                className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg"
                aria-label="Download no Google Play"
              >
                <FaGooglePlay className="text-xl text-green-800" />
                <span className="text-sm text-green-800 font-medium">Google Play</span>
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg"
                aria-label="Download na App Store"
              >
                <FaApple className="text-xl text-green-800" />
                <span className="text-sm text-green-800 font-medium">App Store</span>
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8 self-center">© 2025 BoraSiô. Todos os direitos reservados. <a href="#" className="hover:text-green-700">Política de privacidade</a></p>
        </div>

        {/* Lado direito - Formulário */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-4 sm:text-4xl">Quer falar com a gente?</h2>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            Envie sua mensagem e responderemos o mais breve possível.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome completo"
                value={form.nome}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.nome ? 'border-red-500' : 'border-green-300'} focus:outline-none focus:ring-2 focus:ring-green-600`}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "nome-error" : undefined}
              />
              {errors.nome && <p id="nome-error" className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Digite um e-mail válido"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-green-300'} focus:outline-none focus:ring-2 focus:ring-green-600`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <textarea
                name="mensagem"
                placeholder="Digite sua mensagem"
                rows={5}
                value={form.mensagem}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.mensagem ? 'border-red-500' : 'border-green-300'} focus:outline-none focus:ring-2 focus:ring-green-600`}
                aria-invalid={!!errors.mensagem}
                aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
              ></textarea>
              {errors.mensagem && <p id="mensagem-error" className="text-red-500 text-sm mt-1">{errors.mensagem}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : 'Enviar Mensagem'}
            </button>
          </form>
          
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg mt-4 text-left">
              ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg mt-4 text-left">
              ❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}