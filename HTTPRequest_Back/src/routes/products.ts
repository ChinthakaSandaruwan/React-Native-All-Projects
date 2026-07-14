import { Request, request, Response, Router } from "express";

const router = Router();


//http://localhost:3000/products/get-products 
router.get("/get", (req: Request, res: Response) => {
  
  res.send("get Product");
});

export default router;
