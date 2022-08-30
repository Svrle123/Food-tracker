import { Router } from "express";
import { createFood, getFood } from "../controllers/foodController";

const router: Router = Router();

router.post('/:adminId', createFood)
router.get('/', getFood)

export default router;