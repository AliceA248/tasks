import express, { Request, Response } from "express";
import { TaskRepository } from "repositories/task.repositories";
import { Task } from "models/task.models";

export const taskRouter = express.Router();
const taskRepo = new TaskRepository();

taskRouter.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await taskRepo.getAllTasks();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await taskRepo.getTaskById(id);
    if (!task) {
      return res.status(404).send("Tarefa não encontrada");
    }
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

taskRouter.post("/", async (req: Request, res: Response) => {
    const { title, description, completed } = req.body;
  
    if (!title || !description || completed === undefined)
      return res.status(422).send("Complete todos os campos");
  
    try {
      const existingTask = await taskRepo.getTaskByTitle(title);
      if (existingTask) {
        return res.status(409).send("Essa tarefa já existe!");
      }
  
      const task: Task = {
        id: -1,
        title,
        description,
        completed
      };
  
      const createdTask = await taskRepo.createTask(task);
  
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  