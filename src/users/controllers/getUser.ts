import { Request, Response } from "express";
import { IUserCredential } from "../../utils";
import UserModels from "../model";

const getUser = async (req: Request, res: Response) => {
  const credential: IUserCredential = req.app.locals.credential;
  const { uuid, name, email } = credential;

  const user = await UserModels.findOne({ uuid }).exec();
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
  return res.json({
    status: "success",
    data: { uuid, name, email },
  });
};

export default getUser;
