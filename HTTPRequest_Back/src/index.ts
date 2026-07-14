import express from "express";

const app = express();

app.use(express.json);

app.get("/",(req,res)=>{

    res.send("Welcome to HTTPRequest BackEnd")
});

app.listen(3000,()=>{

    console.log("server running on http://localhost:3000 ");

});