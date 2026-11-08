import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <section className="dish-list">
      {dishes.map((dish) => (
        <article
          className="dish-row"
          data-filter-category={getFilterCategory(dish.category)}
          key={dish.id}
        >
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

function getFilterCategory(category) {
  if (category.includes("Vegan") || category.includes("Fasting")) {
    return "vegetarian";
  }

  if (
    category.includes("Tibs") ||
    category.includes("Kitfo") ||
    category.includes("Stews")
  ) {
    return "signature";
  }

  if (category.includes("Beverages")) {
    return "coffee";
  }

  return "all";
}
