// Create an interface representing a document in MongoDB.

export interface IUser {
  uuid: string;
  name: string;
  email: string;
}

export interface IUserAuth extends IUser {
  password: string;
}

export interface IUserCredential extends IUser {
  iat: number;
  exp: number;
}

export interface ITodo {
  uuid: string;
  title: string;
  done: boolean;
  userId: string;
  createtAt: number;
  updatetAt: number;
}
