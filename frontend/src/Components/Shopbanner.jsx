import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Shopbanner.css";

const ShopBanner = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } 
    );

    const section = document.querySelector(".shop-banner");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div className={`shop-banner ${isVisible ? "show" : ""}`}>
      <h2 className="shop-text">sandamali </h2>
       <h2 className="shop-text"> Shop with Us Today!</h2>
      <button onClick={() => navigate("/register")} className="shop-now-btn">
        Shop Now
      </button>
    </div>
  );
};

export default ShopBanner;
