import { Request, Response } from "express";
import { IUserCredential } from "../../utils";
import TodoModels from "../model";

const getTodo = async (req: Request, res: Response) => {
  const credential: IUserCredential = req.app.locals.credential;
  const userId = credential.uuid;
  const uuid = req.params.id;
  await TodoModels.find({ userId, uuid });
  return res.json({
    status: "success",
    data: `todo with id ${uuid} deleted`,
  });
};

export default getTodo;
