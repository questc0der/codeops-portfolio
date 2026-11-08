import "./SideBar.css";
import { useCart } from "../../context/CartContext.jsx";

function SideBar({ cart }) {
  const { dispatch } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-inner">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2>Order summary</h2>
        </div>
        <span className="cart-count">{itemCount}</span>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <span>+</span>
          <p>Your order is waiting for its first plate.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.idMeal}>
              <div>
                <strong>{item.strMeal}</strong>
                <small>${item.price} each</small>
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() =>
                    dispatch({ type: "DECREMENT", id: item.idMeal })
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({ type: "INCREMENT", id: item.idMeal })
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>Total</span>
        <strong>${total}</strong>
      </div>
      {cart.length > 0 && (
        <button
          className="checkout-button"
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          Place order
        </button>
      )}
    </div>
  );
}

export default SideBar;
