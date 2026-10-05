import Link from "next/link";
import DishList from "./DishList";
import { Suspense } from "react";

export const revalidate = 60;

function DishListFallback() {
  return (
    <section className="dish-list" aria-busy="true">
      <p className="loading-copy">Loading dishes...</p>
    </section>
  );
}

export default function MenuPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Addis Eats / Menu</p>
      <h1>Food with a story.</h1>
      <p className="lede">
        Browse dishes built around the warm, bright flavors of Ethiopia.
      </p>
      <Suspense fallback={<DishListFallback />}>
        <DishList />
      </Suspense>
      <Link className="text-link" href="/?from=menu">
        Back to home
      </Link>
    </main>
  );
}
