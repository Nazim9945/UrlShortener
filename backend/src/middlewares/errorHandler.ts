import { Request, Response, NextFunction } from "express";

// Custom AppError class for structured errors

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}



export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
 

 
  if (!(err instanceof AppError)) {
    // err = new AppError("Internal Server Error", 500, false);
    console.error("Unexpected Error: ", err);
   return res.status(500).json({
      status: "false",
      message:err.message ||  "Internal Server Error",
    });
    
  }

  

  // In production, avoid leaking stack traces
  const response = {
    status: "error",
    message: err.isOperational ? err.message : "Internal Server Error",
  };

  res.status(err.statusCode).json(response);
};
