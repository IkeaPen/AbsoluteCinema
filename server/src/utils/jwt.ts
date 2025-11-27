import jwt from "jsonwebtoken";
import { StringValue } from "ms";

export type UserPayload = {
  user_id: number;
  role: string;
};

const JWT_ACCESS_TOKEN_SECRET  = process.env.JWT_ACCESS_TOKEN_SECRET!;
const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN! as StringValue;
const JWT_REFRESH_TOKEN_SECRET  = process.env.JWT_REFRESH_TOKEN_SECRET!;
const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN! as StringValue;

export function createAccessToken(user_id: number, role: string) {
  return jwt.sign( {user_id: user_id, role: role}, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN });
};

export function createRefreshToken(user_id: number) {
  return jwt.sign( {user_id: user_id}, JWT_REFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN } );
};

export function verifyAccessToken(accessToken: string) {
  return jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET) as UserPayload;
};

export function verifyRefreshToken(refreshToken: string) {
  return jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET) as { user_id: number };
};

