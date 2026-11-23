import { Router } from "express";
import { getAllUsersController, getUserByIdController, postUserController, putUserController, deleteUserController } from "../controllers/userController";

export const userRouter: Router = Router();

userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.post("/", postUserController);
userRouter.put("/:id", putUserController);
userRouter.delete("/:id", deleteUserController);
