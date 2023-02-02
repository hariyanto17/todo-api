import { model, Schema } from "mongoose";
import { ITodo } from "../utils";

//create shema corresponding to the documnets interface
const todoSchema = new Schema<ITodo>({
  uuid: { type: String, required: false },
  title: { type: String, required: true },
  done: { type: Boolean, required: true },
  userId: { type: String, required: true },
  createtAt: {type: Number, require : true},
  updatetAt: {type: Number, require : true}
});

//create a model
const TodoModels = model<ITodo>("Todo", todoSchema);

export default TodoModels;
