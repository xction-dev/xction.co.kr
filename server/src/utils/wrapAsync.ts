import { NextFunction, RequestHandler } from "express";
import { dbClient } from "./db/connect";
import { Db, MongoError } from "mongodb";

type AsyncRequestHandler = (
  req: Parameters<RequestHandler>[0],
  res: Parameters<RequestHandler>[1],
  next: NextFunction,
) => Promise<void>;

type dbRequestHandler = (
  req: Parameters<RequestHandler>[0],
  res: Parameters<RequestHandler>[1],
  db: Db,
  next: NextFunction,
) => Promise<void>;

const wrapAsync =
  (fn: dbRequestHandler): AsyncRequestHandler =>
  (req, res, next) => {
    const db = dbClient;
    if (!db) throw new MongoError("Unable to connect DB instance");
    return fn(req, res, db, next).catch(next);
  };

export default wrapAsync;
