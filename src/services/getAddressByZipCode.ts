type Address = {
  cep: string,
  logradouro: string,
  complemento?: string,
  unidade?: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

export default async function getAddressByCep(cep: string) {
  const response = await fetch(
    `https://viacep.com.br/ws/${cep}/json/`,
    {
      
      next: {
        revalidate: 60
      },
      cache: "no-store"
    }
  )
  return response.json()
}