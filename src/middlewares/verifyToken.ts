import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { JWT_SECRET } = process.env;

  const jwtSecret: string = JWT_SECRET || "secret";

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "token must be provided",
    });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: err.message,
      });
    }

    req.app.locals.credential = decoded
    next();
  });
};

export default verifyToken;
  