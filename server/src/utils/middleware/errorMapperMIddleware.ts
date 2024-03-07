import { ErrorRequestHandler } from "express";
import { MongoError } from "mongodb";
import { ZodError } from "zod";

const errorMapperMiddleware: ErrorRequestHandler = (error, _, res, __) => {
  if (error instanceof ZodError) {
    // Zod Error
    res.status(402).json({ error_type: 3, error_message: error.message });
  } else if (error instanceof MongoError) {
    // MongoDB Error
    res.status(500).json({ error_type: 2, error_message: error.message });
  } else if (error instanceof Error) {
    // Default Error
    res.status(500).json({ error_type: 1, error_message: error.message });
  } else {
    res.status(500).json({ error_type: 0, error_message: "unknown error" });
  }
};

export default errorMapperMiddleware;
