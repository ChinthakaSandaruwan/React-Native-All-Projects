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
        "SELECT mobile, fname, lname, profile_picture FROM user WHERE mobile = ? ",
        [chat.user_1 === mobile ? chat.user_2 : chat.user_1],
      );

      const data = {
        chat_id: chat.chat_id,
        user: user[0],
        last_message: message[0] || null
      };

      chatData.push(data);
    }

    res.status(200).send(chatData);


  } catch (err) {

    
    console.log(err);
    res.status(500).send({msg:"Search error"});
  }
});

router.post("/create", async (req, res) => {
  try {
    const { user_1, user_2 } = req.body;

    if (!user_1 || !user_2) {
      res.status(400).send({ msg: "Both users are required" });
      return;
    }

    // Check if chat already exists between these two users
    const [existing] = await promise.query<RowDataPacket[]>(
      "SELECT * FROM chat WHERE (user_1 = ? AND user_2 = ?) OR (user_1 = ? AND user_2 = ?)",
      [user_1, user_2, user_2, user_1],
    );

    if (existing.length > 0) {
      res.status(200).send({ chat_id: existing[0].chat_id, msg: "Chat already exists" });
      return;
    }

    const [result] = await promise.query(
      "INSERT INTO chat (user_1, user_2) VALUES (?, ?)",
      [user_1, user_2],
    );

    res.status(201).send({ chat_id: (result as any).insertId, msg: "Chat created" });

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "User Not Found" });
  }
});

router.post("/clear-all", async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      res.status(400).send({ msg: "Mobile number is required" });
      return;
    }

    await promise.query(
      "DELETE FROM chat_history WHERE chat_chat_id IN (SELECT chat_id FROM chat WHERE user_1 = ? OR user_2 = ?)",
      [mobile, mobile],
    );

    await promise.query(
      "DELETE FROM chat WHERE user_1 = ? OR user_2 = ?",
      [mobile, mobile],
    );

    res.status(200).send({ msg: "All chats cleared successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error clearing chats" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { chatId } = req.body;
    if (!chatId) {
      res.status(400).send({ msg: "Chat ID is required" });
      return;
    }

    await promise.query(
      "DELETE FROM chat_history WHERE chat_chat_id = ?",
      [chatId],
    );

    await promise.query(
      "DELETE FROM chat WHERE chat_id = ?",
      [chatId],
    );

    res.status(200).send({ msg: "Chat deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error deleting chat" });
  }
});

export default router;
