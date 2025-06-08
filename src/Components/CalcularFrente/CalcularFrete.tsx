'use client';

import { useState } from 'react';

export default function CalcularFrete() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState<{ valor: string; prazo: string } | null>(null);

  const calcular = async () => {
    const response = await fetch('/api/shipping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cepDestino: cep }),
    });

    const data = await response.json();
    console.log(data)
    setResultado(data);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Digite seu CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={calcular} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
        Calcular Frete
      </button>

      {resultado && (
        <div className="mt-4">
          <p>Valor do frete: R$ {resultado.valor}</p>
          <p>Prazo de entrega: {resultado.prazo} dias úteis</p>
        </div>
      )}
    </div>
  );
}