import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  error: string;
  stack: string | null;
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  } as ErrorResponse);
};

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
