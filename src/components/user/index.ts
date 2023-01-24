import { Router } from "express";
import { createUser, loginUser } from "./controller";

const userRouter: Router = Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);

export default userRouter;