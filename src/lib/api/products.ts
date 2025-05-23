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