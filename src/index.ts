import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { taskRouter } from "controller/task.controller";
import { errorHandler } from "middleware/task.middleware";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/tasks", taskRouter);

app.use(errorHandler);


const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Servidor rodando corretamente na porta ${PORT}`)
);
