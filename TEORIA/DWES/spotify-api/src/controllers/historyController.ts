import { Response, Request } from "express";
import { histories } from "../data/history/history";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { getAllHistories, getHistoryById, createHistory } from "../Services/historyService";

export function getAllHistoriesController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllHistories());
}

export function getHistoryByIdController(req: Request, res: Response): Response {
    const history: HistoryBD | undefined = getHistoryById(req.params.id as string);

    if (!history) {
        return res.status(404).json({ message: `History not found` });
    }
    return res.status(200).json(history);
}

export function postHistoryController(req: Request, res: Response): Response {
    const result: CreateSuccessService<HistoryBD> | ErrorService = createHistory(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    histories.push((result as CreateSuccessService<HistoryBD>).data);
    return res.status(result.code).json(result);
}
