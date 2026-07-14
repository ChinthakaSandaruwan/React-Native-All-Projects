import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";
import multer from "multer";

const router = Router();

router.post("/login", (req, res) => {
  const { mobile, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE user.mobile = '" +
      mobile +
      "' AND user.password = '" +
      password +
      "' ",
    (err, result: RowDataPacket[]) => {
      if (!err) {
        if (result.length == 1) {
          res.status(200).send({ user: result[0] });
        } else {
          res.status(401).send({ msg: "Invalid Credentials" });
        }
      } else {
        console.error(err.message);
        res.status(500).send(err.message);
      }
    },
  );
});

router.post("/signup", (req, res) => {
  const { fname, lname, mobile, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE user.mobile = '" + mobile + "'",
    (err, result: RowDataPacket[]) => {
      if (!err) {
        if (result.length === 0) {
          db.query(
            "INSERT INTO user (mobile,fname,lname,password) VALUES ( '" +
              mobile +
              "','" +
              fname +
              "','" +
              lname +
              "','" +
              password +
              "')",
            (inserErr) => {
              if (!inserErr) {
                res.status(201).send({ msg: "User Registed!" });
              } else {
                res
                  .status(500)
                  .send({ msg: "Error occured while registering" });
              }
            },
          );
        } else {
          res.status(400).send({ msg: "Mobile number alredy exsist" });
        }
      } else {
        res.status(500).send({ msg: "Something went wrong" });
      }
    },
  );
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

const pool = db.promise();

router.post("/update", upload.single("image"), async (req, res) => {
  const imagepath = "/uploads/" + req.file?.filename;

  const { fname, lname, password, mobile } = req.body;

  try {

    const [result] = await pool.query(
      "UPDATE user SET fname = ?, lname = ?, password = ? , img = ? WHERE mobile = ?",
      [fname, lname, password, imagepath, mobile],
    );

    console.log(result);

    res.status(200).send({ msg: "success", data: imagepath });

  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
