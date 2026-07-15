import express from "express";
import user from "./routes/user";
import chat from "./routes/chat";
import chatHistory from "./routes/chat-history";
import { startWebSocket } from "./webSocket";
import http from "http";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to ChatApp API");
});

app.use("/user",user);
app.use("/chat",chat);
app.use("/chat-history",chatHistory);

const server = http.createServer(app);

startWebSocket(server);


server.listen(3000,()=>{
    console.log("API Started...");
    console.log("API Url : http://localhost:3000");
});