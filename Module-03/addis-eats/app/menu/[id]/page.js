const menuEndpoint = "https://addis-eats-backend.onrender.com/menu/specials";

export async function generateStaticParams() {
  const response = await fetch(menuEndpoint);
  const data = await response.json();

  return data.data.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  return (
    <main className="page-shell dish-detail">
      <p className="eyebrow">Addis Eats / Dish</p>
      <h1>{id}</h1>
      <p className="lede">A dish worth lingering over.</p>
    </main>
  );
}
