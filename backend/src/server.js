import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS ကို အတိအကျ သတ်မှတ်ပါ
app.use(cors({
  origin: [
    'https://task-manager-kyaw.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add task
app.post("/tasks", async (req, res) => {
  try {
    const { text, priority, deadline, status, completed } = req.body;

    const newTask = await prisma.task.create({
      data: {
        text,
        priority,
        deadline: deadline ? new Date(deadline) : null,
        status,
        completed: completed || false,
      },
    });

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { text, priority, deadline, status, completed } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        text,
        priority,
        deadline: deadline ? new Date(deadline) : null,
        status,
        completed,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
