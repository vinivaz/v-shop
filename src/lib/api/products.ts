export async function searchProducts(term: string) {
  const res = await fetch(`http://localhost:3000/api/products/search?q=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export async function getProductBySlug(slug: string) {

  const res = await fetch(`http://localhost:3000/api/products/${slug}`, {

    cache: "no-cache"
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getProducts() {

  const res = await fetch("http://localhost:3000/api/products", {
    next: { revalidate: 60 },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}