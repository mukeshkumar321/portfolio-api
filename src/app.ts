import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import projectRoutes from "./routes/project-routes.js";
import contactRoutes from "./routes/contact-routes.js";
import resumeRoutes from "./routes/resume-routes.js";
import servicesRoutes from "./routes/services-routes.js";

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

// Request logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use("/api/v1/services", servicesRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/contact", contactRoutes);

// health check
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Portfolio API is running" });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler
const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
};

app.use(errorHandler);

export default app;
