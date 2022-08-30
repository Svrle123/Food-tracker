import express, { Application, Request, Response, json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import foodRoutes from './routes/foodRoutes'
import userRoutes from './routes/userRoutes'

const app: Application = express();
dotenv.config();

declare const process: {
    env: {
        PORT: string
        CONNECTION_URL: string
    }
}

app.use(json({ limit: "30mb" }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/foods', foodRoutes);
app.use('/users', userRoutes);

app.get('/', (_: Request, res: Response) => {
    res.send("Food tracker API");
})

const PORT: string = process.env.PORT || "4000";


connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT))
    .catch((error) => console.log(error));
