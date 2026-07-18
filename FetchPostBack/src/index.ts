import express from "express";
import user from "./routes/user";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to the back end");
});



app.use("/user", user);


app.listen(3000, () => {
  console.log("back end start");
  console.log("Base URL http://192.168.1.11:3000/user/get-user");

});
