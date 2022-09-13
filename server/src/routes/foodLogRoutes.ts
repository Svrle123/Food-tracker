import { Router } from "express";
import { createFoodLog } from "../controllers/foodLogController";

const router: Router = Router();

router.post('/', createFoodLog)

export default router;