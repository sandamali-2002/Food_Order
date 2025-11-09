import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Test route
app.get('/food-items', (req, res) => {
  res.json([
    { name: "Pepperoni Pizza", toppings: ["Extra Cheese", "Olives", "Mushrooms"] },
    { name: "Cheese Pizza", toppings: ["Extra Cheese", "Tomatoes", "Onions"] },
    { name: "Veggie Pizza", toppings: ["Bell Peppers", "Olives", "Mushrooms"] }
  ]);
});

app.post('/order', async (req, res) => {
  res.json({ message: "Order placed!" });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
