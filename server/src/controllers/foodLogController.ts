import { Request, Response } from "express"
import { HydratedDocument } from "mongoose";
import { IFoodEntry, IFoodLog } from "../interfaces";
import FoodLog from "../models/foodLog";
import { createEntries } from "./foodEntryController";

interface RequestBody {
    entries: IFoodEntry[],
    userId: string
}

export const createFoodLog = async (req: Request, res: Response): Promise<void> => {
    const { entries, userId }: RequestBody = req.body;

    try {
        const logEntriesIds = await createEntries(entries);
        const newFoodLog: HydratedDocument<IFoodLog> = new FoodLog<IFoodLog>({
            timeStamp: new Date(),
            userId,
            foodEntries: logEntriesIds,
        });

        newFoodLog.save();

        res.status(201).json(newFoodLog);
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}