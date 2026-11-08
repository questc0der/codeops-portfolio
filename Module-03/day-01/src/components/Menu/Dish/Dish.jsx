import { useCart } from "../../../context/CartContext.jsx";
import "./Dish.css";

function Dish({ meal }) {
  const { cart, dispatch } = useCart();
  const quantity =
    cart.find((item) => item.idMeal === meal.idMeal)?.quantity ?? 0;

  return (
    <article className="dish-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="dish-details">
        <div>
          <p className="dish-category">{meal.strCategory}</p>
          <h2>{meal.strMeal}</h2>
        </div>
        <strong>${meal.price}</strong>
      </div>
      <div className="dish-actions">
        {quantity > 0 && (
          <button
            aria-label={`Decrease ${meal.strMeal}`}
            onClick={() => dispatch({ type: "DECREMENT", id: meal.idMeal })}
          >
            −
          </button>
        )}
        {quantity > 0 && <span>{quantity}</span>}
        <button
          className="add-button"
          onClick={() => dispatch({ type: "ADD_ITEM", item: meal })}
        >
          {quantity > 0 ? "+" : "Add to order"}
        </button>
      </div>
    </article>
  );
}

export default Dish;
