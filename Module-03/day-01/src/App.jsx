import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Menu />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
