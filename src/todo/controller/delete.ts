import { Request, Response } from "express";
import { IUserCredential } from "../../utils";
import TodoModels from "../model";

const deleteTodo = async (req: Request, res: Response) => {
  const credential: IUserCredential = req.app.locals.credential;
  const { uuid } = credential;
  const { id } = req.params;
  const todos = await TodoModels.remove({ userId: uuid, uuid: id });
  return res.json({
    status: "success",
    data: todos,
  });
};

export default deleteTodo;
