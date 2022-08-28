import express from "express";
import { createFood, getFood } from "../controllers/foodController.js";

const router = express.Router();

router.post('/:adminId', createFood)
router.get('/', getFood)

export default router;