import { response, Router } from "express";
import Database from "../db"

const router = Router();

router.get("/get-product",(req,res)=>{


    Database.query("SELECT * FROM product", (error,result)=>{

        if(error){
           console.log(error.message)
            res.status(500).send("Search Error")
        }else{
            res.status(200)
            res.send(result)
        }

    })

});

export default router;