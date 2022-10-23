import { Router } from "express";
import { createFoodLog, getTodaysLogs } from "../controllers/foodLogController";

const router: Router = Router();

router.get('/today/:userId', getTodaysLogs);

router.post('/', createFoodLog);

export default router;