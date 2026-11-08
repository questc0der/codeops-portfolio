import { useState } from "react";
import SideBar from "../SideBar/SideBar.jsx";
import Dish from "./Dish/Dish.jsx";
import { menuFallback } from "../../data/menuFallback.js";
import { useFetch } from "../../hooks/useFetch.js";
import { useCart } from "../../context/CartContext.jsx";
import "./Menu.css";

const MENU_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function priceForMeal(meal, index) {
  return 12 + ((meal.idMeal.charCodeAt(0) + index * 7) % 15);
}

function Menu() {
  const { data, loading, error } = useFetch(MENU_URL, menuFallback);
  const { cart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const meals = data.map((meal, index) => ({
    ...meal,
    price: priceForMeal(meal, index),
  }));
  const categories = ["All", ...new Set(meals.map((meal) => meal.strCategory))];
  const filteredMeals =
    activeCategory === "All"
      ? meals
      : meals.filter((meal) => meal.strCategory === activeCategory);

  return (
    <div className="menu-layout">
      <section className="menu-content">
        <div className="menu-intro">
          <p className="eyebrow">Today's table</p>
          <h1>Comfort, served generously.</h1>
          <p>
            Explore recipes collected from kitchens around the world, then build
            your order one plate at a time.
          </p>
        </div>
        <div className="category-row" aria-label="Filter menu by category">
          {categories.map((category) => (
            <button
              className={
                activeCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {loading && <p className="status-message">Gathering the menu...</p>}
        {error && (
          <p className="status-message">Showing our curated offline menu.</p>
        )}
        <div className="dish-grid">
          {filteredMeals.map((meal) => (
            <Dish key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>
      <aside className="cart-panel">
        <SideBar cart={cart} />
      </aside>
    </div>
  );
}

export default Menu;
