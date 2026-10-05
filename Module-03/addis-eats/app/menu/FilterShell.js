"use client";

const filters = [
  { label: "All dishes", value: "all" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Signature", value: "signature" },
  { label: "Coffee", value: "coffee" },
];

export default function FilterShell({ children }) {
  return (
    <div className="filter-shell">
      <div className="filter-controls" aria-label="Filter dishes">
        {filters.map((filter, index) => (
          <label className="filter" key={filter.value}>
            <input
              defaultChecked={index === 0}
              name="dish-filter"
              type="radio"
              value={filter.value}
            />
            <span>{filter.label}</span>
          </label>
        ))}
      </div>
      {children}
    </div>
  );
}
