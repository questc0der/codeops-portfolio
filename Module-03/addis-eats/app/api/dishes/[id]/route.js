export async function GET(request, { params }) {
  const { id } = await params;
  const dishes = await fetch(
    "https://addis-eats-backend.onrender.com/menu/specials",
  ).then((response) => response.json());
  const dish = dishes.data.find((dish) => dish.id === id);
  return Response.json(dish);
}
