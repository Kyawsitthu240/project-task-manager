import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// ===== CORS FIX =====
app.use(cors({
  origin: [
    "https://task-manager-kyaw.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

// ===== JSON =====
app.use(express.json());

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

// ===== GET TASKS =====
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== CREATE TASK =====
app.post("/tasks", async (req, res) => {
  try {
    const { text, priority, deadline, status, completed } = req.body;

    const newTask = await prisma.task.create({
      data: {
        text,
        priority,
        deadline: deadline ? new Date(deadline) : null,
        status,
        completed: completed || false
      }
    });

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== DELETE TASK =====
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== UPDATE TASK =====
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
        completed
      }
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
