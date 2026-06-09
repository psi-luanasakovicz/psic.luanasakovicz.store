import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-24 px-4 text-center space-y-4">
      <h1 className="font-serif-brand text-3xl font-bold">Página não encontrada</h1>
      <p className="text-sm text-[#527A6B]/80">
        O recurso que você procura não existe ou não está disponível.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#88B7A5] text-white px-6 py-3 rounded-full text-sm font-semibold"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
