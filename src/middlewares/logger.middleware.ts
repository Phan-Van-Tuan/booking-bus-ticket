import { Request, Response, NextFunction } from "express";

// Middleware ghi log
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    // console.log(
    //   `[INFO] ${req.method} ${req.url} ${res.statusCode} - ${
    //     req.user.id || "No user"
    //   } - ${new Date().toISOString()}`
    // );
    console.log(
      `[INFO] ${req.method} ${req.url} ${
        res.statusCode
      } - ${new Date().toISOString()}`
    );
  });
  next();
};

export default requestLogger;
