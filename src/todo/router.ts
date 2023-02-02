import { Router } from "express";
import createTodo from "./controller/create";
import deleteTodo from "./controller/delete";
import getTodo from "./controller/get";
import getAllTodos from "./controller/getAll";
import updateTodo from "./controller/update";

const router = Router();

router.post("/", createTodo); // create
router.get("/", getAllTodos); // getAll
router.get("/:id", getTodo); // getById
router.put("/:id", updateTodo); // update
router.delete("/:id", deleteTodo); //delete

export default router;
