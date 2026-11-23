import { randomUUID } from "crypto";
import { histories } from "../data/history/history";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { History } from "../interfaces/history/history";
import { isValidHistory } from "../validators/history.validator";


export function getAllHistories(): HistoryBD[] {
    return histories;
}

export function getHistoryById(idHistory: string): HistoryBD | undefined {
    return histories.find((h: HistoryBD) => { return h.id === idHistory });
}

export function createHistory(history: History): CreateSuccessService<HistoryBD> | ErrorService {

    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idhistory: string = randomUUID()

    const historyRecord: HistoryBD = {
        id: idhistory,
        user: history.user,
        track: history.track,
        date: history.date.trim()
    };

    return { success: true, code: 201, data: historyRecord };
}
