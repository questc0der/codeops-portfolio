import Link from "next/link";
import DishList from "./DishList";
import FilterShell from "./FilterShell";

export const revalidate = 60;

const menuEndpoint = "https://addis-eats-backend.onrender.com/menu/specials";

export default async function MenuPage() {
  const response = await fetch(menuEndpoint);
  const data = await response.json();

  return (
    <main className="page-shell">
      <p className="eyebrow">Addis Eats / Menu</p>
      <h1>Food with a story.</h1>
      <p className="lede">
        Browse dishes built around the warm, bright flavors of Ethiopia.
      </p>
      <FilterShell>
        <DishList dishes={data.data} />
      </FilterShell>
      <Link className="text-link" href="/?from=menu">
        Back to home
      </Link>
    </main>
  );
}
