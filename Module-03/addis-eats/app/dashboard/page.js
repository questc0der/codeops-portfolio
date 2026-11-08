import Link from "next/link";
import { db } from "@/app/db";
import RevenueChart from "./RevenueChart";

const money = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 });
const dateLabel = new Intl.DateTimeFormat("en-ET", { month: "short", day: "numeric" });

function summarizeOrders(orders) {
  const revenueByNeighbourhood = new Map();
  const ordersByDay = new Map();
  let revenue = 0;
  for (const order of orders) {
    if (order.status === "CANCELLED") continue;
    const total = order.total ?? 0;
    revenue += total;
    revenueByNeighbourhood.set(order.neighborhood, (revenueByNeighbourhood.get(order.neighborhood) ?? 0) + total);
    const day = order.createdAt.slice(0, 10);
    ordersByDay.set(day, (ordersByDay.get(day) ?? 0) + 1);
  }
  return {
    revenue,
    revenueByNeighbourhood: [...revenueByNeighbourhood].map(([neighborhood, revenue]) => ({ neighborhood, revenue })).sort((a, b) => b.revenue - a.revenue),
    ordersByDay: [...ordersByDay].map(([date, orders]) => ({ date, orders })).sort((a, b) => a.date.localeCompare(b.date)),
  };
}

function OrdersLineChart({ data }) {
  const width = 640; const height = 230; const max = Math.max(...data.map((item) => item.orders), 1);
  const points = data.map((item, index) => `${55 + index * (540 / Math.max(data.length - 1, 1))},${180 - (item.orders / max) * 120}`).join(" ");
  return <svg viewBox={`0 0 ${width} ${height}`} className="line-chart" role="img" aria-label="Orders per day from October 14 to October 19">
    <line x1="55" x2="600" y1="180" y2="180" className="chart-grid" />
    <polyline points={points} fill="none" className="line-path" />
    {data.map((item, index) => { const x = 55 + index * (540 / Math.max(data.length - 1, 1)); const y = 180 - (item.orders / max) * 120; return <g key={item.date}><circle cx={x} cy={y} r="5" className="line-dot" /><text x={x} y="210" textAnchor="middle" className="chart-axis-label">{dateLabel.format(new Date(`${item.date}T00:00:00`))}</text></g>; })}
  </svg>;
}

export default async function DashboardPage({ searchParams }) {
  const query = await searchParams;
  if (query.state === "loading") await new Promise((resolve) => setTimeout(resolve, 900));
  const state = query.state;
  const orders = state === "empty" ? [] : await db.order.findMany();
  const summary = summarizeOrders(orders);
  const dateRange = summary.ordersByDay.length ? `${dateLabel.format(new Date(`${summary.ordersByDay[0].date}T00:00:00`))}–${dateLabel.format(new Date(`${summary.ordersByDay.at(-1).date}T00:00:00`))}` : "this period";

  return <main className="dashboard-shell">
    <p className="eyebrow">Addis Eats / Operations</p>
    <div className="dashboard-heading"><div><h1>Delivery dashboard</h1><p>Revenue and order patterns across Addis Ababa.</p></div><Link className="text-link" href="/orders">Open orders</Link></div>
    {state === "error" ? <section className="state-card state-error" role="alert"><h2>We could not load the dashboard.</h2><p>The order summary is unavailable right now. Please try again.</p><Link href="/dashboard">Try again</Link></section> : orders.length === 0 ? <section className="state-card"><h2>Your dashboard is ready for its first order.</h2><p>Revenue and neighbourhood trends will appear as soon as orders arrive.</p><Link href="/menu">Browse the menu</Link></section> : <>
      <section className="metric-grid" aria-label="Order summary"><article><p>Total revenue</p><strong>{money.format(summary.revenue)}</strong></article><article><p>Completed orders</p><strong>{orders.filter((order) => order.status !== "CANCELLED").length}</strong></article><article><p>Neighbourhoods served</p><strong>{summary.revenueByNeighbourhood.length}</strong></article></section>
      <section className="chart-card"><div><p className="chart-kicker">Revenue</p><h2>Revenue by neighbourhood</h2></div><RevenueChart data={summary.revenueByNeighbourhood} /><table className="chart-data-table"><caption>Revenue data for the bar chart</caption><thead><tr><th scope="col">Neighbourhood</th><th scope="col">Revenue</th></tr></thead><tbody>{summary.revenueByNeighbourhood.map((item) => <tr key={item.neighborhood}><td>{item.neighborhood}</td><td>{money.format(item.revenue)}</td></tr>)}</tbody></table></section>
      <section className="chart-card"><div><p className="chart-kicker">Order volume</p><h2>Orders per day, {dateRange}</h2></div><OrdersLineChart data={summary.ordersByDay} /><table className="chart-data-table"><caption>Orders-per-day data for the line chart</caption><thead><tr><th scope="col">Date</th><th scope="col">Orders</th></tr></thead><tbody>{summary.ordersByDay.map((item) => <tr key={item.date}><td><time dateTime={item.date}>{dateLabel.format(new Date(`${item.date}T00:00:00`))}</time></td><td>{item.orders}</td></tr>)}</tbody></table></section>
    </>}
    <p className="demo-links">Demo states: <Link href="/dashboard?state=loading">loading</Link>, <Link href="/dashboard?state=empty">empty</Link>, <Link href="/dashboard?state=error">error</Link>.</p>
  </main>;
}
