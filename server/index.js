import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Food tracker API");
})

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT))
    .catch((error) => console.log(error));
