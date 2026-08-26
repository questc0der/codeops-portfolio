import "./Dish.css";

function Dish({ name, price }) {
  console.log(name);
  console.log(price);
  return (
    <>
      <div className="dish-container">
        {/* <div className="dish"> */}
        <img src="./" alt="Food picture" />
        <strong>{name}</strong>
        <strong>{price}</strong>
        {/* </div> */}
      </div>
    </>
  );
}

export default Dish;
