'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [errors, setErrors] = useState({ nome: '', email: '', mensagem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="min-h-screen bg-green-100 font-poppins relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-200/50 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004d2b] mb-4">
            Vamos de <span className="text-amber-600">BoraSiô?</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer ser nosso parceiro? Nossa equipe está pronta para te atender com o jeitinho maranhense.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-green-50">

          {/* Info Side */}
          <div className="lg:col-span-5 bg-[#004d2b] p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-12">
                <Image
                  src="/img/borasio.png"
                  alt="BoraSiô Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <h2 className="text-2xl font-bold tracking-tight">Central de Atendimento</h2>
              </div>

              <div className="space-y-10">
                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-yellow-400 group-hover:text-[#004d2b] transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-semibold mb-1 uppercase tracking-wider text-xs">Onde estamos</h3>
                    <p className="text-green-50 text-lg">
                      Av. dos Holandeses, 500<br />
                      Ponta D'Areia, São Luís - MA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-yellow-400 group-hover:text-[#004d2b] transition-all duration-300">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-semibold mb-1 uppercase tracking-wider text-xs">WhatsApp</h3>
                    <a href="https://wa.me/5598999999999" className="text-green-50 text-lg hover:text-white transition-colors">
                      (98) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-yellow-400 group-hover:text-[#004d2b] transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-semibold mb-1 uppercase tracking-wider text-xs">E-mail</h3>
                    <a href="mailto:contato@borasio.com" className="text-green-50 text-lg hover:text-white transition-colors">
                      contato@borasio.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-[0.2em] mb-6">Nossas Redes</h3>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com" },
                  { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" },
                  { icon: <Smartphone className="w-5 h-5" />, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-yellow-400 hover:text-[#004d2b] transition-all duration-300 border border-white/5">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold text-[#004d2b] mb-2">Envie uma mensagem</h2>
            <p className="text-gray-500 mb-8 font-medium">Preencha o formulário abaixo e responderemos em até 24 horas.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-bold text-[#004d2b] mb-2 uppercase tracking-wide">Seu Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Ex: João da Silva"
                  value={form.nome}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border ${errors.nome ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#004d2b] focus:ring-green-100'} transition-all focus:outline-none focus:ring-4 placeholder:text-gray-400`}
                />
                {errors.nome && <div className="flex items-center gap-1 mt-2 text-red-500 text-sm font-medium"><AlertCircle className="w-4 h-4" /> {errors.nome}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[#004d2b] mb-2 uppercase tracking-wide">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="exemplo@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#004d2b] focus:ring-green-100'} transition-all focus:outline-none focus:ring-4 placeholder:text-gray-400`}
                  />
                  {errors.email && <div className="flex items-center gap-1 mt-2 text-red-500 text-sm font-medium"><AlertCircle className="w-4 h-4" /> {errors.email}</div>}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-bold text-[#004d2b] mb-2 uppercase tracking-wide">WhatsApp (Opcional)</label>
                  <input
                    type="text"
                    id="whatsapp"
                    placeholder="(98) 90000-0000"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#004d2b] focus:ring-green-100 transition-all focus:outline-none focus:ring-4 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-bold text-[#004d2b] mb-2 uppercase tracking-wide">Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="Como podemos te ajudar hoje?"
                  value={form.mensagem}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border ${errors.mensagem ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#004d2b] focus:ring-green-100'} transition-all focus:outline-none focus:ring-4 placeholder:text-gray-400 resize-none`}
                />
                {errors.mensagem && <div className="flex items-center gap-1 mt-2 text-red-500 text-sm font-medium"><AlertCircle className="w-4 h-4" /> {errors.mensagem}</div>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-[#004d2b] to-[#006b3d] text-white font-bold text-lg shadow-[0_10px_30px_-10px_rgba(0,77,43,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(0,77,43,0.4)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <p className="font-semibold">Mensagem enviada com sucesso! Em breve entraremos em contato.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p className="font-semibold">Ocorreu um erro ao enviar. Por favor, tente novamente.</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Area with quick download */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-amber-50 rounded-[2.5rem] p-10 border border-amber-100 flex flex-col items-center text-center gap-6 shadow-sm">
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <Smartphone className="w-10 h-10 text-amber-600" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-[#004d2b] tracking-tight">Ainda não tem o App?</h4>
              <p className="text-gray-600 font-medium max-w-md">Baixe agora na sua loja de aplicativos e comece a economizar com o jeitinho maranhense.</p>
            </div>
            <Link href="#" className="mt-4 px-12 py-5 bg-[#004d2b] text-white rounded-2xl font-bold hover:bg-[#003823] transition-all hover:scale-105 shadow-lg shadow-[#004d2b]/20">Baixar Agora</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
