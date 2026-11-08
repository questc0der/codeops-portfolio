import Link from "next/link";
import Providers from "../Providers";

export default function CartPage() {
  return (
    <Providers>
      <main className="page-shell">
        <p className="eyebrow">Addis Eats / Cart</p>
        <h1>Your table, nearly ready.</h1>
        <p className="lede">
          Your cart is waiting for a few bright, generous things.
        </p>
        <div className="detail-actions">
          <Link className="button" href="/checkout">
            Continue to checkout
          </Link>
          <Link className="text-link" href="/menu">
            Keep browsing
          </Link>
        </div>
      </main>
    </Providers>
  );
}
