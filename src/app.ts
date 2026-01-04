import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1/projects", projectRoutes);

// health check
app.get("/", (_req, res) => {
  res.json({ message: "Portfolio API is running" });
});

// 404 handler
app.use((_req, _res, next) => {
  const error = new Error("Route not found");
  next(error);
});

// Request logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

export default app;
