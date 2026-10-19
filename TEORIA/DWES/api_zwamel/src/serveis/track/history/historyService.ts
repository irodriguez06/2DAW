import { randomUUID } from "crypto";
import { history } from "../../../data/track/history/history";
import { tracks } from "../../../data/track/track";
import { users } from "../../../data/track/user/user";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { History } from "../../../interfaces/history/history";
import { HistoryBD } from "../../../interfaces/history/historyBD";
import { isValidHistory } from "../../../validators/historyValidator";

export function getAllHistory(): HistoryBD[] {
    return [...history].sort(
        (first, second) => Date.parse(second.data) - Date.parse(first.data),
    );
}

export function getHistoryById(idHistory: string): HistoryBD | undefined {
    return history.find((item: HistoryBD) => item.id === idHistory);
}

export function createHistory(
    item: History,
): CreateSuccessService<HistoryBD> | ErrorService {
    if (!isValidHistory(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const userId: string = item.user.trim();
    if (!users.some((user) => user.id === userId)) {
        return { success: false, code: 404, message: `User ${userId} not found` };
    }

    const trackId: string = item.track.trim();
    if (!tracks.some((track) => track.id === trackId)) {
        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    return {
        success: true,
        code: 201,
        data: {
            id: randomUUID(),
            user: userId,
            track: trackId,
            data: new Date(item.data.trim()).toISOString(),
        },
    };
}
