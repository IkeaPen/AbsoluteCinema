import { Request, Response, NextFunction } from 'express';
import { Prisma } from "@prisma/client";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let handledError = err;
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    handledError = handlePrismaError(err);
  }

  console.error(handledError);
  res.status(handledError.status || 500).json({
    message: handledError.message || "Internal Server Error",
  });
};

function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): AppError {
  switch (error.code) {
    case "P2002":
      return { ...error, status: 400, message: "Duplicate entry violates unique constraint" };
    case "P2003":
      return { ...error, status: 409, message: "Invalid reference to another record" };
    case "P2025":
      return { ...error, status: 404, message: "Record not found" };
    case "P2000":
      return { ...error, status: 400, message: "Provided value is too long" };
    case "P2014":
      return { ...error, status: 400, message: "Invalid relation reference" };
    case "P2033":
      return { ...error, status: 400, message: "Numeric value out of range" };
    default:
      return { ...error, status: 400, message: "Database request failed" };
  }
}