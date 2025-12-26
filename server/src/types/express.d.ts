import { IUser } from "../types/index";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      file?: Multer.File;
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
    }
  }
}
export {};
