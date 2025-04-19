export default function LoginPage() {
  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      {/* Login box */}
      <div className="bg-green-50 mt-10 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">Entrar</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-green-800 mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-green-800 mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder=""
              className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-900 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-green-900 mt-4">
          Não tem uma conta?{' '}
          <a href="/cadastro" className="hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </main>
  );
}
