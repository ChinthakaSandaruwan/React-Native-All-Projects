import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";

const router = Router();
const promise = db.promise();

router.get("/get-chats", async (req, res) => {
  try {
    const mobile = req.query.mobile;

    if(!mobile){
        res.status(400).send({msg:"Mobile number is required"});
    }

    const [chats] = await promise.query<RowDataPacket[]>(
      "SELECT * FROM chat WHERE chat.user_1 = ? OR chat.user_2 = ? ",
      [mobile, mobile],
    );

    const chatData = [];

    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];

      const [message] = await promise.query<RowDataPacket[]>(
        "SELECT * FROM chat_history WHERE chat_chat_id = ? ORDER BY sent_at DESC LIMIT 1",
        [chat.chat_id],
      );

      const [user] = await promise.query<RowDataPacket[]>(
        "SELECT mobile, fname, lname, img FROM user WHERE mobile = ? ",
        [chat.user_1 === mobile ? chat.user_2 : chat.user_1],
      );

      const data = {
        user: user[0],
        last_message: message[0]
      };

      chatData.push(data);
    }

    res.status(200).send(chatData);


  } catch (err) {
    console.log(err);
    res.status(500).send({msg:"Search error"});
  }
});

export default router;
