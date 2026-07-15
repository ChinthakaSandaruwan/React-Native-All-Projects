import express from "express";
import productRoute from "./routes/products";

const app = express();

app.use(express.json());

<<<<<<< HEAD
=======

>>>>>>> 3b8abaf62abca9c95119607098e2eb16b6cd24c0
app.get("/", (req, res) => {
  res.send("Welcome to HTTP Request BackEnd");
});

//  http://192.168.1.13:3000/products
app.use("/products", productRoute);

app.listen(3000, () => {
  console.log("server running on http://192.168.1.13:3000");
});

