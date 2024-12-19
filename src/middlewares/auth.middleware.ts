import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt";
import { data } from "../utils/token.interface";

// Middleware xác thực (Authenticate)
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const data = decodeToken(token) as data;
    // console.log(data);
    req.user = data.payload; // Gắn thông tin người dùng vào request
    next();
  } catch (error) {
    next(error);
  }
};

// // Middleware phân quyền (Authorize)
const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admins only" });
    return;
  }
  next();
};

export { authenticate, authorizeAdmin };
