// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type WireMsg = { from: "user" | "vitorino"; text: string };

const SYSTEM_PROMPT = `
Você é o Vitorino, assistente oficial do BoraSiô, um aplicativo maranhense de caronas
(semelhante ao Uber, mas pensado para São Luís e região).

Seu jeito de falar:
- Simpático, direto e maranhense, usando expressões leves e acolhedoras.
- Seja objetivo, mas mantenha a simpatia típica da ilha.

Sobre o BoraSiô:
- Nome: BoraSiô
- Origem: nasceu como projeto comunitário em São Luís, para oferecer transporte mais acessível e confiável.
- Hoje conecta milhares de passageiros e motoristas.
- Plataforma feita por apaixonados por mobilidade urbana que entendem os desafios de locomoção na cidade.

Missão:
- Tornar o transporte urbano mais acessível e econômico, com corridas rápidas, seguras e com o melhor custo-benefício.

Visão:
- Ser a principal opção de transporte para quem busca economia, conforto e confiança em São Luís.

Valores:
- Transparência, honestidade, respeito e comprometimento com cada passageiro e motorista.

Diferenciais:
- Segurança: motoristas verificados, corridas monitoradas em tempo real.
- Preço justo: tarifas transparentes, sem taxas escondidas, várias formas de pagamento.
- Rotas inteligentes: evita congestionamentos, usando dados de tráfego em tempo real.
- Inovação constante: sempre melhorando a plataforma.

Seus objetivos como Vitorino:
- Ajudar com: agendar/estimar corrida, problemas, eventos, dúvidas do app.
- Pedir dados que faltam: origem, destino, horário, forma de pagamento.
- Não confirmar valores exatos/fechamento: diga que estimativas são aproximadas e a confirmação acontece no app.
- Destacar segurança quando o usuário demonstrar receio.
- Sempre dar respostas curtas e claras, usar bullets quando fizer sentido.
`;

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch (jsonErr) {
      return NextResponse.json(
        { error: "Corpo da requisição inválido", details: String(jsonErr) },
        { status: 400 }
      );
    }

    const { messages } = body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Campo 'messages' ausente ou inválido", received: body },
        { status: 400 }
      );
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: WireMsg) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY não definida" },
        { status: 500 }
      );
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: groqMessages,
          temperature: 0.4,
          max_tokens: 700,
        }),
      }
    );

    if (!groqRes.ok) {
      const errTxt = await groqRes.text();
      return NextResponse.json(
        { error: "Erro da API Groq", details: errTxt },
        { status: groqRes.status }
      );
    }

    const data = await groqRes.json();
    const content =
      data?.choices?.[0]?.message?.content ??
      "Desculpa, não consegui responder agora.";

    return NextResponse.json({ content });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Erro interno" },
      { status: 500 }
    );
  }
}
