
import { Suspense } from 'react';
import ResetarSenhaForm from '../components/ResetarSenhaForm';

export default function ResetarSenhaPage() {
  return (
    <main className="resetar-senha-container">
      <Suspense fallback={<div>Carregando formulário...</div>}>
        <ResetarSenhaForm />
      </Suspense>
    </main>
  );
}
