import { Router } from "express";
import { getAllHistoriesController, getHistoryByIdController, postHistoryController } from "../controllers/historyController";

export const historyRouter: Router = Router();

historyRouter.get("/", getAllHistoriesController);
historyRouter.get("/:id", getHistoryByIdController);
historyRouter.post("/", postHistoryController);
