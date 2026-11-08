import "./Header.css";

function Header() {
  return (
    <header className="header">
      <a className="brand" href="/">
        Savor<span>.</span>
      </a>
      <span className="location">Addis Ababa / Online menu</span>
      <span className="header-mark">
        Open today <b>11:00 - 22:00</b>
      </span>
    </header>
  );
}

export default Header;
