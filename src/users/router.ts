import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import getUser from "./controllers/getUser";
import login from "./controllers/login";
import register from "./controllers/register";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", verifyToken, getUser);

export default router;
