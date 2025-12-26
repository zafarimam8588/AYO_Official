import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types";

export const generateToken = (payload: JwtPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }
  // CREATING TOKEN
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE || "7d" } as SignOptions
  );
  return token;
};
