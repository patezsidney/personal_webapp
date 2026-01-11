import { Header } from '@/components/layout/header';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-4 text-3xl font-bold">Controle pessoal</h1>

        <p className="max-w-xl text-muted">
          Organize sua vida pessoal, controle contas, acompanhe faturas e planeje seus gastos de
          forma consciente e segura.
        </p>
      </main>
    </>
  );
}
