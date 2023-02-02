import { Request, Response } from "express";
import { IUserCredential } from "../../utils";
import TodoModels from "../model";

const getAllTodos = async (req: Request, res: Response) => {
  const credential: IUserCredential = req.app.locals.credential;
  const { uuid } = credential;
  const todos = await TodoModels.find({ userId :uuid })
  return res.json({
    status: "success",
    data: todos,
  });
};

export default getAllTodos;
