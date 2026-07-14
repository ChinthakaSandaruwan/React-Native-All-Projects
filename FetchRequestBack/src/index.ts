import express from "express";


const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to HTTP Request BackEnd");
});



app.listen(3000, () => {
  console.log("server running on http://192.168.1.13:3000 ");
});

