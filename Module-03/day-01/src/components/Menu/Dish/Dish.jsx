import { useState } from "react";
import "./Dish.css";

function Dish({ name, price }) {
  console.log(name);
  console.log(price);
  const [quantity, setQuantity] = useState(0);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  // function handleDecrement() {
  //   setCount(quantity - 1);
  // }

  return (
    <>
      <div className="dish-container">
        {/* <div className="dish"> */}
        <img src="./" alt="Food picture" />
        <strong>{name}</strong>
        <strong>{price}</strong>
        <div className="add-button-and-quantity">
          <button className="add-button" onClick={handleIncrement}>
            Add
          </button>
          <strong>{quantity}</strong>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Dish;
