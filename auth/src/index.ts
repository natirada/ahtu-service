import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import authRoute from "./routes/user";

const port = process.env.PORT || 3000;
dotenv.config();

connect(
  `mongodb+srv://nati:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.bfwtb.mongodb.net/?retryWrites=true&w=majority`
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
