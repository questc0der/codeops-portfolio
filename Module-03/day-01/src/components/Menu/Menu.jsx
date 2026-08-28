import SideBar from "../SideBar/SideBar";
import Dish from "./Dish/Dish";
import "./Menu.css";

const menu = [
  { id: 1, name: "Doro Wat", category: "Main", price: 240 },
  { id: 2, name: "Shiro", category: "Vegetarian", price: 120 },
  { id: 3, name: "Tibs", category: "Main", price: 280 },
  { id: 4, name: "Tibs", category: "Main", price: 280 },
  { id: 5, name: "Kitfo", category: "Main", price: 310 },
  { id: 6, name: "Beyaynetu", category: "Vegetarian", price: 150 },
];

function Menu() {
  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="main">
          {menu.map((dish) => (
            <Dish key={dish.id} name={dish.name} price={dish.price} />
          ))}
          {/* <Dish /> */}
        </div>
      </div>
    </>
  );
}

export default Menu;
