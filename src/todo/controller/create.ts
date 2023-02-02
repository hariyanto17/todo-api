import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Validator from "fastest-validator";
import TodoModels from "../model";
import { IUserCredential } from "../../utils";

const v = new Validator();

const createTodo = async (req: Request, res: Response) => {
  const { title, done } = req.body;
  const credential: IUserCredential = req.app.locals.credential;
  const { uuid } = credential;
  //validasi request
  const schema = {
    title: { type: "string" },
    done: { type: "boolean", optional: true },
  };
  const check = v.compile(schema);
  if (check(req.body) !== true) {
    return res.status(400).json({
      status: "error",
      message: check(req.body),
    });
  }

  const create = new TodoModels({
    uuid: uuidv4(),
    title,
    done: done ? done : false,
    userId: uuid,
    createtAt: Date.now(),
    updatetAt: Date.now(),
  });
  await create.save();
  //return userData
  return res.status(200).json({
    status: "success",
    data: create,
  });
};

export default createTodo;
