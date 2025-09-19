const express = require('express');
const router = express.Router();

// Configure a sua chave secreta do Stripe.
// A biblioteca 'dotenv' (configurada no seu arquivo principal) carregará a variável.
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('ERRO FATAL: A variável de ambiente STRIPE_SECRET_KEY não foi definida. Verifique seu arquivo .env');
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Supondo que você tenha um modelo de usuário para o seu banco de dados
// const User = require('../models/User');

/**
 * @route   POST /usuario
 * @desc    Cria um novo usuário no seu sistema e um cliente correspondente no Stripe
 * @access  Public
 */
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validação simples dos dados de entrada
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Por favor, forneça nome, email e senha.' });
  }

  try {
    // --- 1. LÓGICA DO SEU BANCO DE DADOS (EXEMPLO) ---
    // Aqui você deve adicionar o código para salvar o novo usuário no seu próprio banco de dados.
    // Por exemplo:
    // const novoUsuario = await User.create({ nome, email, senha });
    // O código abaixo é apenas uma simulação.
    console.log(`Simulando: Usuário ${nome} (${email}) salvo no banco de dados.`);
    const idDoUsuarioNoSeuDB = 'id-gerado-pelo-seu-banco-de-dados'; // Substitua pelo ID real


    // --- 2. CRIAR O CLIENTE NO STRIPE ---
    // Agora, crie o cliente no Stripe usando os dados do usuário.
    const customer = await stripe.customers.create({
      name: nome,
      email: email,
      // É uma boa prática adicionar metadados para vincular ao seu sistema.
      metadata: {
        appUserId: idDoUsuarioNoSeuDB,
      }
    });

    console.log(`Cliente criado no Stripe com sucesso: ${customer.id}`);

    // --- 3. ATUALIZAR SEU BANCO DE DADOS ---
    // Salve o ID do cliente Stripe (`customer.id`) no registro do usuário.
    // Isso é ESSENCIAL para futuras transações.
    // Por exemplo:
    // await User.findByIdAndUpdate(idDoUsuarioNoSeuDB, { stripeCustomerId: customer.id });
    console.log(`Simulando: ID do Stripe (${customer.id}) salvo para o usuário ${email}.`);


    // --- 4. ENVIAR A RESPOSTA ---
    res.status(201).json({
      message: 'Usuário e cliente Stripe criados com sucesso!',
      userId: idDoUsuarioNoSeuDB,
      stripeCustomerId: customer.id
    });

  } catch (err) {
    console.error('Erro ao criar usuário ou cliente Stripe:', err);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
  }
});

// Placeholder de middleware de autenticação. Em um app real, isso verificaria um token (JWT).
const protegerRota = async (req, res, next) => {
  // --- LÓGICA DE AUTENTICAÇÃO (EXEMPLO) ---
  // Em um sistema real, você decodificaria um token (ex: JWT) do header 'Authorization'.
  // O token conteria o ID do usuário.
  // const token = req.headers.authorization?.split(' ')[1];
  // if (!token) return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decoded.id;

  // Para este exemplo, vamos simular um usuário logado buscando seus dados.
  const userId = 'id-gerado-pelo-seu-banco-de-dados'; // ID do usuário que estaria logado.

  // Agora, você buscaria o usuário no seu banco de dados para obter o stripeCustomerId.
  // const usuarioDoDB = await User.findById(userId);
  // if (!usuarioDoDB || !usuarioDoDB.stripeCustomerId) {
  //   return res.status(404).json({ error: 'Usuário ou ID de cliente Stripe não encontrado.' });
  // }

  // Anexa as informações do usuário à requisição para serem usadas na próxima função.
  req.user = {
    id: userId,
    // Simulando o ID do Stripe que viria do seu banco de dados.
    // IMPORTANTE: Para testar, você pode criar um cliente no painel do Stripe e usar o ID dele aqui.
    stripeCustomerId: 'cus_xxxxxxxxxxxxxx' 
  };
  console.log(`ROTA PROTEGIDA: Acessada pelo usuário ${req.user.id} com Stripe ID ${req.user.stripeCustomerId}`);
  next();
};

/**
 * @route   POST /usuario/cobrar-corrida
 * @desc    Cria uma intenção de pagamento (cobrança) para uma corrida no Stripe
 * @access  Private (Rota agora protegida por autenticação)
 */
router.post('/cobrar-corrida', protegerRota, async (req, res) => {
  // O `stripeCustomerId` agora vem do usuário autenticado (req.user), não do corpo da requisição.
  // Isso é MUITO mais seguro, pois impede que um usuário tente fazer uma cobrança por outro.
  const { stripeCustomerId } = req.user;
  const { valor, hora, paymentMethodType } = req.body;

  // Validação dos dados de entrada
  if (!valor || !hora || !paymentMethodType) {
    return res.status(400).json({ 
      error: 'É necessário fornecer "valor", "hora" e "paymentMethodType" (pix ou boleto).' 
    });
  }

  if (!['pix', 'boleto'].includes(paymentMethodType)) {
    return res.status(400).json({ error: 'O "paymentMethodType" deve ser "pix" ou "boleto".' });
  }

  try {
    // --- 1. PREPARAR O VALOR PARA O STRIPE ---
    // A API do Stripe trabalha com valores em centavos (a menor unidade da moeda).
    // Exemplo: R$ 25,50 deve ser enviado como 2550.
    // IMPORTANTE: Em um app real, o valor NUNCA deve ser totalmente confiado do cliente.
    // O ideal é que o servidor calcule ou valide o preço da corrida para evitar fraudes.
    // Ex: const valorVerificado = calcularPrecoCorrida(origem, destino);
    const amountInCents = Math.round(parseFloat(valor) * 100);

    // --- 2. CRIAR E CONFIRMAR A INTENÇÃO DE PAGAMENTO ---
    // Para gerar um QR Code (Pix) ou um PDF (Boleto) diretamente,
    // precisamos criar e confirmar o PaymentIntent em uma única etapa no servidor.

    let paymentMethod;

    // Para Boleto, é necessário criar um PaymentMethod com os dados do pagador.
    if (paymentMethodType === 'boleto') {
      const customer = await stripe.customers.retrieve(stripeCustomerId);
      paymentMethod = await stripe.paymentMethods.create({
        type: 'boleto',
        billing_details: {
          name: customer.name,
          email: customer.email,
          // Em um app real, você coletaria o endereço e CPF/CNPJ do usuário.
          // Aqui, usamos dados de exemplo para a demonstração.
          address: {
            line1: 'Rua Fictícia, 123',
            city: 'São Paulo',
            state: 'SP',
            postal_code: '01234-567',
            country: 'BR',
          },
        },
        // Use um CPF de teste válido, apenas números.
        boleto: {
          tax_id: '11144477735',
        },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'brl', // Moeda: Real Brasileiro
      customer: stripeCustomerId, // Vincula esta cobrança ao cliente específico
      description: `Cobrança de corrida no valor de R$ ${valor}`,
      payment_method_types: [paymentMethodType],
      // Se for boleto, já informamos o payment_method criado
      payment_method: paymentMethodType === 'boleto' ? paymentMethod.id : undefined,
      // 'confirm: true' tenta realizar o pagamento imediatamente.
      // Para Pix e Boleto, isso gera a 'next_action' (QR code/link do boleto).
      confirm: true,
      // Metadados são úteis para guardar informações adicionais que você pode ver no painel do Stripe
      metadata: {
        hora_corrida: hora,
      }
    });

    // --- 3. ENVIAR A RESPOSTA PARA O CLIENTE (FRONT-END) ---
    // Enviamos o objeto PaymentIntent completo, pois ele contém a 'next_action'
    // com os dados do QR Code ou do Boleto.
    res.status(200).json({
      message: 'Intenção de pagamento criada com sucesso!',
      paymentIntent: paymentIntent,
    });

  } catch (err) {
    console.error('Erro ao criar PaymentIntent no Stripe:', err);
    // Melhora o feedback de erro para o frontend
    let errorMessage = 'Ocorreu um erro no servidor ao criar a cobrança.';
    if (err.type === 'StripeInvalidRequestError') {
        // Ex: CPF inválido, endereço faltando, etc.
        errorMessage = `Dados inválidos para a cobrança: ${err.message}`;
    }
    res.status(500).json({ error: errorMessage, details: err.message });
  }
});

module.exports = router;