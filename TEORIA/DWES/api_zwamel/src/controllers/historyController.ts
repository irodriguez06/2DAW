import { Request, Response } from "express";
import { history } from "../data/track/history/history";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import {
    createHistory,
    getAllHistory,
    getHistoryById,
} from "../serveis/track/history/historyService";

export function getAllHistoryController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllHistory());
}

export function getHistoryByIdController(req: Request, res: Response): Response {
    const historyItem: HistoryBD | undefined = getHistoryById(req.params.id as string);

    if (!historyItem) {
        return res.status(404).json({ message: "History record not found" });
    }

    return res.status(200).json(historyItem);
}

export function postHistoryController(req: Request, res: Response): Response {
    const result: CreateSuccessService<HistoryBD> | ErrorService = createHistory(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    history.push((result as CreateSuccessService<HistoryBD>).data);
    return res.status(result.code).json(result);
}
