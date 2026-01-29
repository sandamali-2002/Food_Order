import React from "react";
import { useNavigate } from "react-router-dom";
import "./Shops.css";

const shops = [
  {
    id: 1,
    name: "Fab",
    description: "Best Pizzas in Town",
    theme: "linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)"
  },
  {
    id: 2,
    name: "p&s",
    description: "Finger Lickin' Good",
    theme: "linear-gradient(135deg, #FF9F43 0%, #EE5A24 100%)"
  },
  {
    id: 3,
    name: "Mr Kottu",
    description: "Home of the Whopper",
    theme: "linear-gradient(135deg, #54a0ff 0%, #2e86de 100%)"

    
  },
  {
    id: 4,
    name: "Hela Raula",
    description: "Home of the Whopper",
    theme: "linear-gradient(135deg, #ff5479ff 0%, #b8de2eff 100%)"

    
  },
  {
    id: 5,
    name: "Dutch",
    description: "Home of the Whopper",
    theme: "linear-gradient(135deg, #68ff54ff 0%, #2e7adeff 100%)"

    
  },
  {
    id: 6,
    name: "Indian Hut",
    description: "Home of the Whopper",
    theme: "linear-gradient(135deg, #ff5454ff 0%, #de572eff 100%)"

    
  },
];

export default function Shops() {
  const navigate = useNavigate();

  return (
    <div className="shops-container">
      <div className="shops-header">
        <h2>Select a Restaurant</h2>
        <p>Where would you like to order from today?</p>
      </div>

      <div className="shop-grid">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => navigate(`/foods/${shop.id}`)}
            style={{ background: shop.theme }}
          >
            <div className="shop-content">
              <h3>{shop.name}</h3>
              <p>{shop.description}</p>
              <span className="shop-arrow">➜</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
