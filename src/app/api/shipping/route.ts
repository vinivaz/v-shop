// src/app/api/correios/frete/route.ts (em App Router)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { cepDestino } = await request.json();

  const xmlBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
      <soapenv:Header/>
      <soapenv:Body>
        <cli:calcPrecoPrazo>
          <nCdEmpresa></nCdEmpresa>
          <sDsSenha></sDsSenha>
          <nCdServico>04014</nCdServico> <!-- 04014 = SEDEX -->
          <sCepOrigem>01001-000</sCepOrigem>
          <sCepDestino>${cepDestino}</sCepDestino>
          <nVlPeso>1</nVlPeso>
          <nCdFormato>1</nCdFormato>
          <nVlComprimento>20</nVlComprimento>
          <nVlAltura>5</nVlAltura>
          <nVlLargura>15</nVlLargura>
          <nVlDiametro>0</nVlDiametro>
          <sCdMaoPropria>N</sCdMaoPropria>
          <nVlValorDeclarado>0</nVlValorDeclarado>
          <sCdAvisoRecebimento>N</sCdAvisoRecebimento>
        </cli:calcPrecoPrazo>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await fetch('https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/CalcPrecoPrazo',
      },
      body: xmlBody,
    });

    const xml = await response.text();

    const valorMatch = xml.match(/<Valor>(.*?)<\/Valor>/);
    const prazoMatch = xml.match(/<PrazoEntrega>(.*?)<\/PrazoEntrega>/);

    return NextResponse.json({
      valor: valorMatch?.[1] ?? '0,00',
      prazo: prazoMatch?.[1] ?? '0',
    });
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    return NextResponse.json({ error: 'Erro ao calcular frete' }, { status: 500 });
  }
}
