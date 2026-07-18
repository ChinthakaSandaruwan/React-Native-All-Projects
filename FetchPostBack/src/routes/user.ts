import { Router } from "express";
import dbConn from "../connection";

const router = Router();

router.get("/get-users", (req, res) => {
  dbConn.query("SELECT * FROM user", (error, result) => {
    if (error) {
      res.status(500).send("Database Search Error");
    } else {
      res.send(result);
    }
  });
});


router.post("/add-user",(req,res)=>{
  //  const name = req.body.name
  //  const email = req.body.email
  //  const password = req.body.password

   const {name,email,password} = req.body;

   console.log(name,email,password)

})

export default router;
