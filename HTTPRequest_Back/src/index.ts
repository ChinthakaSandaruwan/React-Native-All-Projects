import express from "express";
import productRoute from "./routes/products";

const app = express();

app.use(express.json());

<<<<<<< HEAD
app.get("/",(req,res)=>{

    res.send("Welcome to HTTPRequest BackEnd")
});

app.listen(3000,()=>{

    console.log("server running on http://localhost:3000 ");

});
=======
app.get("/", (req, res) => {
  res.send("Welcome to HTTP Request BackEnd");
});

//  http:// 192.168.1.13:3000/products
app.use("/products", productRoute);

app.listen(3000, () => {
  console.log("server running on http://192.168.1.13:3000 ");
});
>>>>>>> 53b7eefa0a3fa6b5f6f56d3b79557e66f4aec13a
