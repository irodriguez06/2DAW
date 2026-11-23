import { Request, Response } from "express";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import {
    createHistory,
    getAllHistory,
    getHistoryById,
} from "../serveis/track/history/historyService";

export async function getAllHistoryController(_req: Request, res: Response): Promise<Response> {
    const history: HistoryBD[] = await getAllHistory();
    return res.status(200).json(history);
}

export async function getHistoryByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<HistoryBD> | ErrorService = await getHistoryById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function postHistoryController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createHistory(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}
