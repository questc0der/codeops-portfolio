"use client";

import { useId, useState } from "react";

const money = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export default function RevenueChart({ data }) {
  const [active, setActive] = useState(null);
  const titleId = useId();
  const max = Math.max(...data.map((item) => item.revenue), 1);
  const width = 640;
  const height = 290;
  const chartTop = 30;
  const chartBottom = 230;
  const gap = 22;
  const barWidth = (width - 72 - gap * (data.length - 1)) / data.length;

  return (
    <div className="chart-frame">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={titleId}
        className="revenue-chart"
      >
        <title id={titleId}>Revenue by Addis Ababa neighbourhood</title>
        {[0, 0.5, 1].map((point) => {
          const y = chartBottom - (chartBottom - chartTop) * point;
          return (
            <g key={point}>
              <line x1="48" x2="620" y1={y} y2={y} className="chart-grid" />
              <text x="40" y={y + 4} textAnchor="end" className="chart-axis-label">
                {money.format(max * point)}
              </text>
            </g>
          );
        })}
        {data.map((item, index) => {
          const barHeight = ((chartBottom - chartTop) * item.revenue) / max;
          const x = 58 + index * (barWidth + gap);
          const y = chartBottom - barHeight;
          const isActive = active === index;
          return (
            <g key={item.neighborhood}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="5"
                className={isActive ? "chart-bar is-active" : "chart-bar"}
                tabIndex="0"
                role="graphics-symbol"
                aria-label={`${item.neighborhood}: ${money.format(item.revenue)}`}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              />
              <text x={x + barWidth / 2} y="252" textAnchor="middle" className="chart-axis-label">
                {item.neighborhood}
              </text>
              {isActive && (
                <text x={x + barWidth / 2} y={Math.max(y - 10, 18)} textAnchor="middle" className="chart-value">
                  {money.format(item.revenue)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
