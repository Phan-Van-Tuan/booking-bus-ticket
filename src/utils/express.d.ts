import { payload } from "./token.interface";

declare global {
  namespace Express {
    interface Request {
      user: payload;
    }
  }
}
