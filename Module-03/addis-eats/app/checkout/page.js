import Link from "next/link";
import { cookies } from "next/headers";

// The request-specific pickup cookie requires checkout to render dynamically.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const pickupTime = cookieStore.get("pickup-time")?.value;

  return (
    <main className="page-shell">
      <p className="eyebrow">Addis Eats / Checkout</p>
      <h1>One last detail.</h1>
      <p className="lede">
        {pickupTime
          ? `Your pickup time is ${pickupTime}.`
          : "Choose a pickup time and we will have your order ready."}
      </p>
      <Link className="text-link" href="/">
        Return home
      </Link>
    </main>
  );
}
