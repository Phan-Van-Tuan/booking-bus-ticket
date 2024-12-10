import { NextFunction, Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await register(req.body);
    res.status(201).json({
      message: "",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.status(200).json({
      message: "",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};
