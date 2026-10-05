"use client";

import { useRouter } from "next/navigation";

export default function GoToMenuButton() {
  const router = useRouter();

  return (
    <button
      className="button button-dark"
      onClick={() => router.push("/menu")}
      type="button"
    >
      Explore the menu
    </button>
  );
}
