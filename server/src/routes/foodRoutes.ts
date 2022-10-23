import { Router } from "express";
import { createFood, getAllTypes, getFood } from "../controllers/foodController";

const router: Router = Router();

router.get('/', getFood);
router.get('/food-types', getAllTypes);

router.post('/:adminId', createFood);

export default router;