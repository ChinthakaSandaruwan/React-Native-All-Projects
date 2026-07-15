import { Server } from "http";
import { WebSocketServer } from "ws";
import db from "./db";

export function startWebSocket(server: Server) {

  const userConnections = new Map();

  const wsServer = new WebSocketServer({ server });

  wsServer.on("connection", (ws) => {
    console.log("Connected to websocket");

    ws.on("message", (data) => {
      const msgData = JSON.parse(data.toString());

      if (msgData.type === "register") {
        //save to map
        userConnections.set(msgData.data, ws);
        console.log("Connection saved!");

      } else if (msgData.type === "chat") {
        //send to receiver
        const { data, receiver, sender, chatId } = msgData;

        const receiverWs = <WebSocket>userConnections.get(receiver);

        //save to database
        const pool = db.promise();

        try {

          pool.query(
            "INSERT INTO chat_history (message, sent_at, chat_chat_id, sender, msg_status_id) VALUES (?,?,?,?,?)",
            [data, new Date(), chatId, sender, 1],
          );

        } catch (err) {
            console.log(err);
        }

        //send to receiver
        if (receiverWs) {

          const msgData = {
            message: data,
            sent_at: new Date().toISOString(),
            sender: sender,
          };

          receiverWs.send(JSON.stringify(msgData));
          console.log("Msg sent");
        }

      } else if (msgData.type === "ghost_chat") {
        //anonymous ghost chat — receiver does not know who sent it
        const { data, sender, chatId } = msgData;

        const pool = db.promise();

        try {

          // Save message to ghost_chat_history
          pool.query(
            "INSERT INTO ghost_chat_history (message, sent_at, ghost_chat_chat_id, sender, msg_status_id) VALUES (?,?,?,?,?)",
            [data, new Date(), chatId, sender, 1],
          );

          // Find the other participant from ghost_chat table
          pool.query(
            "SELECT * FROM ghost_chat WHERE chat_id = ?",
            [chatId]
          ).then(([rows]: any) => {

            if (rows.length === 0) return;

            const chat = rows[0];
            const receiverMobile = chat.user_1 === sender ? chat.user_2 : chat.user_1;
            const receiverWs = <WebSocket>userConnections.get(receiverMobile);

            // Send to receiver anonymously — no real sender identity
            if (receiverWs) {

              const ghostMsg = {
                message: data,
                sent_at: new Date().toISOString(),
                sender: "anonymous",
              };

              receiverWs.send(JSON.stringify(ghostMsg));
              console.log("Ghost msg sent anonymously");
            }

          });

        } catch (err) {
            console.log(err);
        }
      }
    });

    ws.on("close", () => {

      userConnections.forEach((value, key) => {
        if (value === ws) userConnections.delete(key);
      });

    });


  });
}
