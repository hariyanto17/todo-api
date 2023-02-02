import { Request, Response } from "express";
import Validator from "fastest-validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import UserModels from "../model";

const v = new Validator();

const register = async (req: Request, res: Response) => {
  const { name } = req.body;
  const email = req.body.email.toLowerCase();
  //validasi request
  const schema = {
    name: { type: "string" },
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
  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exist",
    });
  }

  //hash password
  const password = await bcrypt.hash(req.body.password, 10);

  //save to database
  const createUser = new UserModels({
    uuid: uuidv4(),
    name,
    email,
    password,
    createAt: Date.now(),
  });
  await createUser.save();

  //return userData
  return res.status(200).json({
    status: "success",
    data: createUser,
  });
};

export default register;
