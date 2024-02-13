import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import { connect } from "mongoose";
import { authRouter, contactsRouter } from "./routes/index.js";

dotenv.config();
const { DB_HOST, PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
   res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
   const { status = 500, message = "Server error" } = err;
   res.status(status).json({
      code: status,
      message,
   });
});

connect(DB_HOST)
   .then(() => console.log("Database connection successful.".green.bold))
   .then(() => {
      app.listen(PORT, () => {
         console.log(
            `Server is running. Use our API on port: ${PORT}`.green.bold
         );
      });
   })
   .catch((err) => {
      console.error(err.message.red.bold);
      process.exit(1);
   });
