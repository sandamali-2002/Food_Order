import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddressForm.css";

export default function AddressForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { food, shopId } = location.state || {};

  const [data, setData] = useState({
    address: "",
    mobile: "",
  });

  // Order options state
  const [size, setSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const availableToppings = [
    { name: "Extra Cheese", price: 150 },
    { name: "Spicy Sauce", price: 50 },
    { name: "Garlic Dip", price: 100 },
  ];

  // Calculate total price whenever options change
  useEffect(() => {
    if (food) {
      let basePrice = food.price;

      // Size multiplier
      if (size === "Small") basePrice *= 0.8;
      if (size === "Large") basePrice *= 1.2;

      // Add toppings
      const toppingsCost = toppings.reduce((acc, toppingName) => {
        const topping = availableToppings.find(t => t.name === toppingName);
        return acc + (topping ? topping.price : 0);
      }, 0);

      const final = (basePrice + toppingsCost) * quantity;
      setTotalPrice(Math.round(final));
    }
  }, [food, size, quantity, toppings]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setToppings([...toppings, value]);
    } else {
      setToppings(toppings.filter(t => t !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food) {
      alert("No food item selected.");
      return;
    }

    const orderData = {
      foodName: food.name,
      price: food.price, // Base unit price
      shopId: shopId,
      address: data.address,
      mobile: data.mobile,
      size,
      quantity,
      toppings,
      totalPrice
    };

    try {
      await axios.post("http://18.213.255.201:3001/api/order/complete", orderData);
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!food) {
    return (
      <div className="address-container">
        <div className="address-card">
          <h2>No Item Selected</h2>
          <button onClick={() => navigate(-1)} className="confirm-btn">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="address-container">
      <div className="address-card">
        <div className="address-header">
          <h2>Customize & Order</h2>
          <p>Complete your order for <strong>{food.name}</strong></p>
        </div>

        <form className="address-form" onSubmit={handleSubmit}>
          {/* Order Customization Section */}
          <div className="order-options">
            <div className="form-group">
              <label>Size</label>
              <div className="radio-group">
                {["Small", "Medium", "Large"].map((s) => (
                  <label key={s} className="radio-label">
                    <input
                      type="radio"
                      value={s}
                      checked={size === s}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <div className="form-group">
              <label>Extra Toppings</label>
              <div className="checkbox-group">
                {availableToppings.map((t) => (
                  <label key={t.name} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={t.name}
                      onChange={handleToppingChange}
                    />
                    {t.name} (+ Rs. {t.price})
                  </label>
                ))}
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* Contact Details Section */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="e.g. 123 Main Street"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="e.g. 077 123 4567"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="confirm-btn">
            Confirm Order - Rs. {totalPrice}
          </button>
        </form>
      </div>
    </div>
  );
}
