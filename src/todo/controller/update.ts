import { Request, Response } from "express";
import TodoModels from "../model";

const updateTodo = async (req: Request, res: Response) => {
  const uuid = req.params.id;

  const filter = { uuid };
  const update = { ...req.body, updatetAt: Date.now() };
  console.log('update', update)

  const todos = await TodoModels.findOneAndUpdate(filter, update);
  return res.json({
    status: "success",
    data: todos,
  });
};

export default updateTodo;
