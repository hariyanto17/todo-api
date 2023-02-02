import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Validator from "fastest-validator";
import jwt from "jsonwebtoken";
import UserModels from "../model";

const v = new Validator();
const login = async (req: Request, res: Response) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase()
  const schema = {
    email: { type: "email" },
    password: { type: "string" },
  };

  const check = v.compile(schema);
  if (check(req.body) !== true) {
    return res.status(400).json({
      status: "error",
      message: check(req.body),
    });
  }

  // check if the email is already in the database
  const user = await UserModels.findOne({ email: email }).exec();
  // if there is not already return error
  if (!user) {
    return res.status(409).json({
      status: "error",
      message: "email not found",
    });
  }

  //validate password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(404).json({
      status: "error",
      message: "Invalid password",
    });
  }

  const {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_REFRESH_TOKEN_EXPIRED,
  } = process.env;

  const jwtSecret: string = JWT_SECRET || "secret";
  const jwtExpired: string = JWT_ACCESS_TOKEN_EXPIRED || "1d";
  const jwtRefreshTOken: string = JWT_SECRET_REFRESH_TOKEN || "secret";
  const jwtRefreshTOkenExpired: string = JWT_REFRESH_TOKEN_EXPIRED || "1d";
console.log('user', user)
  const data = {
    uuid: user.uuid,
    email: email,
    name: user.name,
  };

  const token = jwt.sign(data, jwtSecret, {
    expiresIn: jwtExpired,
  });

  const refreshToken = jwt.sign(data, jwtRefreshTOken || "secret", {
    expiresIn: jwtRefreshTOkenExpired || "1d",
  });

  //return userData
  return res.status(200).json({
    status: "success",
    data: {
      token,
      refreshToken,
    },
  });
};

export default login;
