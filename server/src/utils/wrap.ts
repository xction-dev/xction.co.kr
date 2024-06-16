import { RequestHandler } from "express";

type AsyncRequestHandler = (
  ...param: Parameters<RequestHandler>
) => Promise<void>;

// type dbRequestHandler = (
//   req: Parameters<RequestHandler>[0],
//   res: Parameters<RequestHandler>[1],
//   db: Db,
//   next: NextFunction,
// ) => Promise<void>;

const wrap =
  (fn: AsyncRequestHandler): AsyncRequestHandler =>
  (req, res, next) => {
    return fn(req, res, next).catch(next);
  };

export default wrap;
