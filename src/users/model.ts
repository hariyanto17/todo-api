import { model, Schema } from "mongoose";
import { IUserAuth } from "../utils";

//create shema corresponding to the documnets interface
const usersShema = new Schema<IUserAuth>({
  uuid: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//create a model
const UserModels = model<IUserAuth>("User", usersShema);

export default UserModels;
