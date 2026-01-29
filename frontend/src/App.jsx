import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shops from "./pages/Shops";
import Foods from "./pages/Foods";
import AddressForm from "./pages/AddressForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* NEW FLOW */}
        <Route path="/shops" element={<Shops />} />
        <Route path="/foods/:shopId" element={<Foods />} />
        <Route path="/order" element={<AddressForm />} />
      </Routes>
    </Router>
  );
}

export default App;
