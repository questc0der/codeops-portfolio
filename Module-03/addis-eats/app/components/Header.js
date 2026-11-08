import Link from "next/link";

export default function Header() {
  return (
    <header className="app-header">
      <Link className="app-wordmark" href="/">Addis <span>Eats</span></Link>
      <nav aria-label="Primary navigation">
        <Link href="/menu">Menu</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/orders">Orders</Link>
      </nav>
    </header>
  );
}
