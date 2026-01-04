import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
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
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Portfolio API is running" });
});

// 404 handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error("Route not found");
  next(error);
});

// Error handler - must have 4 parameters for Express to recognize it as error handler
const errorHandler: ErrorRequestHandler = (err, req: Request, _res: Response, next: NextFunction) => {
  console.error(err.stack);
  next(err);
};

app.use(errorHandler);

// Request logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

export default app;
