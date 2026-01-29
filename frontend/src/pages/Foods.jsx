import { useParams, useNavigate } from "react-router-dom";
import "./Foods.css";

const foods = [
  { id: 1, name: "Spicy Nasi Goreng", price: 1500, img: "/img/Spicy-Nasi-Goreng-1.jpg" },
  { id: 2, name: "Chicken Shawarma", price: 850, img: "/img/chicken-shawarma-photo.webp" },
  { id: 3, name: "Birria Tacos", price: 1200, img: "/img/delish-202104-birriatacos-033-1619806490.avif" },
  { id: 4, name: "Crispy Fried Chicken", price: 1600, img: "/img/fried-2509089_960_720.jpg" },
  { id: 5, name: "Chicken Kottu", price: 1100, img: "/img/kottu-6319363_1920.jpg" },
  { id: 6, name: "Fried Noodles", price: 950, img: "/img/noodles-6967801_1920.jpg" },
];

export default function Foods() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="foods-container">
      <div className="foods-header">
        <h2>Delicious Menu</h2>
        <p>Choose from our hand-picked favorites</p>
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <div
            key={food.id}
            className="food-card"
            onClick={() => navigate("/order", { state: { food, shopId } })}
          >
            <div className="food-image-wrapper">
              <img src={food.img} alt={food.name} loading="lazy" />
            </div>
            <div className="food-info">
              <h3>{food.name}</h3>
              <div className="food-meta">
                <span className="price">Rs. {food.price}</span>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
