import CategoryBar from "./CategoryBar";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <p className="sidebar-label">Browse the menu</p>
        <CategoryBar />
      </aside>
      <div className="menu-content">{children}</div>
    </div>
  );
}