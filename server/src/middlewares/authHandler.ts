import { Request, Response, NextFunction } from "express";
import { createError } from "../middlewares/errorHandler";
import { verifyAccessToken } from "../utils/jwt";

export function authHandler(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return next(createError("Unauthorized", 401));
  }

  try {
    const userInfo = verifyAccessToken(accessToken);
    (req as any).user = userInfo;
    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return next(createError("ACCESS_EXPIRED", 403));
    }
    else {
      return next(createError("Invalid token", 403));
    }
  }
}

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user.role !== "ADMIN") {
    return next(createError("Forbidden", 403));
  }
  return next();
}




