import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell state-panel">
      <p className="eyebrow">404 / Addis Eats</p>
      <h1>That dish is not on our menu.</h1>
      <p className="lede">Try another plate, or return to the full menu.</p>
      <Link className="button" href="/menu">
        See the menu
      </Link>
    </main>
  );
}
