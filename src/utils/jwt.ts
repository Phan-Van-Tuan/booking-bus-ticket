import jwt from "jsonwebtoken";
import { config } from "../configs/env.config";

const generateToken = (data: object, expire: string) => {
  return jwt.sign(
    {
      payload: data,
    },
    config.JWT_SECRET,
    { expiresIn: expire }
  );
};

const decodeToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};

export { generateToken, decodeToken };
