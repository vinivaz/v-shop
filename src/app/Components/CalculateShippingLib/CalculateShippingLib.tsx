'use client';

import { useState } from 'react';
import { calculateShipping } from '../../actions/calculateShipping';

export default function CalculateShippingLib() {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<{ valor: string; prazo: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = await calculateShipping(cep);
    setFrete(resultado);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Calcular Frete</h1>

      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Calcular
        </button>
      </form>

      {frete && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Valor do frete:</strong> R$ {frete.valor}</p>
          <p><strong>Prazo de entrega:</strong> {frete.prazo} dias úteis</p>
        </div>
      )}
    </main>
  );
}








