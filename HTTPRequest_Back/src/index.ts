import express from "express";
import productRoute from "./routes/products";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to HTTP Request BackEnd");
});

//  http://192.168.1.13:3000/products
app.use("/products", productRoute);

app.listen(3000, () => {
  console.log("server running on http://192.168.1.13:3000");
});

