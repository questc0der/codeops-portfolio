import Link from "next/link";

const categories = ["All dishes", "Vegetarian", "Signature", "Coffee"];

export default function CategoryBar() {
  return (
    <nav className="category-bar" aria-label="Dish categories">
      {categories.map((category, index) => (
        <Link
          className={index === 0 ? "category active" : "category"}
          key={category}
          href={
            index === 0 ? "/menu" : `/menu?category=${category.toLowerCase()}`
          }
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
