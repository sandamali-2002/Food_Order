import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderForm.css";

export default function OrderForm() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [toppings, setToppings] = useState([]);
  const [selectedTopping, setSelectedTopping] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Medium");

  const API_URL = import.meta.env.VITE_API_URL || "http://18.213.255.201:3001";

  useEffect(() => {
    axios
      .get(`${API_URL}/food-items`)
      .then((res) => setFoodItems(res.data))
      .catch((err) => console.log("Error fetching food items:", err));
  }, []);

  useEffect(() => {
    const food = foodItems.find((item) => item.name === selectedFood);
    setToppings(food ? food.toppings : []);
    setSelectedTopping("");
  }, [selectedFood, foodItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const order = {
        foodItem: selectedFood,
        topping: selectedTopping,
        quantity,
        size,
      };
      const res = await axios.post(`${API_URL}/order`, order);
      alert(res.data.message);

      setSelectedFood("");
      setSelectedTopping("");
      setQuantity(1);
      setSize("Medium");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Your Order</h2>

      <label>Food Item:</label>
      <select
        value={selectedFood}
        onChange={(e) => setSelectedFood(e.target.value)}
        required
      >
        <option value="">Select Food Item</option>
        {foodItems.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <label>Topping:</label>
      <select
        value={selectedTopping}
        onChange={(e) => setSelectedTopping(e.target.value)}
        required
        disabled={!selectedFood}
      >
        <option value="">Select Topping</option>
        {toppings.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label>Quantity:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />

      <label>Size:</label>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>

      <button type="submit">Order Now</button>
    </form>
  );
}
