import express from "express";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import { connectMongoose } from './util/connectMongoose.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(cors({
 
   origin:["http://localhost:5000","http://localhost:5173"],
   credentials: true
}))

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);

const connected = await connectMongoose();

if (connected) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
} else {
  console.error("Unable to connect to MongoDB.!");
}
