import { Pool } from "pg";
import { Task } from "models/task.models";

export class TaskRepository {
  private connection: Pool;

  constructor() {
    this.connection = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  async getAllTasks(): Promise<Task[]> {
    const result = await this.connection.query<Task>(
      `SELECT * FROM tasks`
    );
    return result.rows;
  }

  async getTaskById(id: string): Promise<Task | null> {
    const result = await this.connection.query<Task>(
      `SELECT * FROM tasks WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async getTaskByTitle(title: string): Promise<Task | null> {
    const result = await this.connection.query<Task>(
      `SELECT * FROM tasks WHERE title = $1`,
      [title]
    );
    return result.rows[0] || null;
  }

  async createTask(task: Task): Promise<void> {
    const { title, description, completed } = task;
    await this.connection.query(
      `INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)`,
      [title, description, completed]
    );
  }
}
