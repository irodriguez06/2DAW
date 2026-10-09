import { Router } from "express";
import { getAllUsersController, postUserController, putUserController, deleteUserController } from "../controllers/usersController";

export const userRouter:Router = Router();

userRouter.get("/", getAllUsersController)
userRouter.get("/:id", getAllUsersController)
userRouter.post("/:id", postUserController)
userRouter.put("/:id", putUserController)
userRouter.delete("/:id", deleteUserController)