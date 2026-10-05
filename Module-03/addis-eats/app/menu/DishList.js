import Link from "next/link";

export default async function DishList() {
  const response = await fetch(
    "https://addis-eats-backend.onrender.com/menu/specials",
  );
  const data = await response.json();
  console.log(data);
  return (
    <section className="dish-list">
      {data.data.map((dish) => (
        <article className="dish-row" key={dish.id}>
          <div>
            <p className="dish-kicker">{dish.id}</p>
            <h2>{dish.nameEn}</h2>
            <p>{dish.description}</p>
          </div>
          <div className="dish-action">
            <strong>{dish.priceETB}</strong>
            <Link className="small-link" href={`/menu/${dish.id}`}>
              View dish
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
