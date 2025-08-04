'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold ">Erro ao carregar a página</h2>
      <p className="text-gray-700 my-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Tentar novamente
      </button>
    </div>
  );
}