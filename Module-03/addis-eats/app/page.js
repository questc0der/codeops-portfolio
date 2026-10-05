import Link from "next/link";
import GoToMenuButton from "./GoToMenuButton";

export default function Home() {
  return (
    <main className="home-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/">
          Addis <span>Eats</span>
        </Link>
        <div className="nav-links">
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </nav>
      <section className="hero">
        <p className="eyebrow">A neighborhood table in Addis</p>
        <p className="hero-copy">
          Slow food, generous plates, and the kind of coffee that makes an
          afternoon disappear.
        </p>
        <div className="hero-actions">
          <GoToMenuButton />
          <Link className="text-link" href="/checkout">
            Plan a pickup
          </Link>
        </div>
      </section>
      <aside className="home-note">
        <span>01 / 03</span>
        <p>Spiced, shared, and made for staying a while.</p>
      </aside>
    </main>
  );
}
