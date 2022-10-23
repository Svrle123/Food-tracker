import { Router } from "express";
import { createFood, getFood } from "../controllers/foodController";

const router: Router = Router();

router.get('/', getFood);
router.post('/:adminId', createFood);

export default router;