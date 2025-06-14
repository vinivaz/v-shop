type ReadyData = {
  name: string;
  category: string;
  description: string;
  mainImage?: string;
  variations: {
    main: boolean;
    name: string;
    stock: string;
    price: string;
    images: string[];
  }[]
}

const rootURL = process.env.NEXT_PUBLIC_URL;

export async function searchProducts(term: string) {
  const res = await fetch(`${rootURL}/api/products/search?q=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export async function getProductBySlug(slug: string) {

  const res = await fetch(`${rootURL}/api/products/${slug}`, {

    cache: "no-cache"
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getProducts() {

  const res = await fetch(`${rootURL}/api/products`, {
    next: { revalidate: 60 },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function registerProduct(data: ReadyData) {
  return await fetch(`${rootURL}/api/products`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}