import jwt, { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }
  // CREATING TOKEN
  const token = jwt.sign(
    { userId: userId.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE || "7d" } as SignOptions
  );
  return token;
};
