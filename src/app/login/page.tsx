export default function LoginPage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">BoraSiô Login</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full border p-3 rounded"
            />
            <input
              type="password"
              placeholder="Sua senha"
              className="w-full border p-3 rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
            >
              Entrar
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Ainda não tem uma conta?{" "}
            <a href="/cadastro" className="text-green-600 hover:underline">Cadastre-se</a>
          </p>
        </div>
      </main>
    );
}