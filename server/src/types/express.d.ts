import { IUser } from "../types/index";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export {};
