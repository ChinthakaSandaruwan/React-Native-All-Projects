import express from "express";
import User from "./routes/user";
import Product from "./routes/product";


const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to HTTP Request BackEnd");
});

app.use("/user",User);

app.use("/product",Product)


app.listen(3000, () => {
  console.log("server running on 192.168.1.2:3000 ");
});

