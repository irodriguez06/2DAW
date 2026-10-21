import { Router } from "express";
import {
    deleteUserController,
    getAllUsersController,
    getUserByIdController,
    postUserController,
    putUserController,
} from "../controllers/usersController";

export const userRouter:Router = Router();

userRouter.get("/", getAllUsersController)
userRouter.get("/:id", getUserByIdController)
userRouter.post("/", postUserController)
userRouter.put("/:id", putUserController)
userRouter.delete("/:id", deleteUserController)