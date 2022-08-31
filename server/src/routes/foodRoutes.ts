import { Router } from "express";
import { createFood, getAllTypes, getFood } from "../controllers/foodController";

const router: Router = Router();

router.post('/:adminId', createFood)
router.get('/', getFood)
router.get('/food-types', getAllTypes);

export default router;