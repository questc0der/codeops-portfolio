"use client";

export default function MenuError({ reset }) {
  return (
    <main className="page-shell state-panel">
      <p className="eyebrow">Addis Eats / Menu</p>
      <h1>The kitchen is taking a breath.</h1>
      <p className="lede">The menu could not be loaded this time.</p>
      <button className="button" onClick={() => reset()} type="button">
        Try the menu again
      </button>
    </main>
  );
}
