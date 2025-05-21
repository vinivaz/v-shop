"use client"

import { useState } from "react";
import RatingInput from "../RatingInput";

export default function StarRatingTest() {
  const [avaliacao, setAvaliacao] = useState<number>(0);

  const handleSubmit = () => {
    console.log("Avaliação enviada:", avaliacao);
    // Aqui você pode enviar para sua API ou banco de dados
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Avalie o produto</h2>
      <RatingInput onChange={setAvaliacao} />
      <p className="mt-2">Nota: {avaliacao} estrelas</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Enviar Avaliação
      </button>
    </div>
  );
}
