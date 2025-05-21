'use server';

import { calcularPrecoPrazo } from 'correios-brasil';

export async function calculateShipping(cep: string) {
  const args = {
    sCepOrigem: '01001-000', // CEP da loja
    sCepDestino: cep,
    nVlPeso: '1',
    nCdFormato: '1',
    nVlComprimento: '20',
    nVlAltura: '10',
    nVlLargura: '15',
    nVlDiametro: '0',
    sCdMaoPropria: 'n',
    nVlValorDeclarado: '0',
    sCdAvisoRecebimento: 'n',
    nCdServico: ['04014'], // SEDEX
  };

  try {
    const resultado = await calcularPrecoPrazo(args);
    return {
      valor: resultado[0].Valor,
      prazo: resultado[0].PrazoEntrega,
    };
  } catch (err) {
    console.error('Erro ao calcular frete:', err);
    return null;
  }
}
