import { History } from "../interfaces/history/history";

export function isValidHistory(history: History): boolean {
    if (!history) {
        return false;
    }

    if (
        typeof history.user !== "string"
        || typeof history.track !== "string"
        || history.user.trim().length === 0
        || history.track.trim().length === 0
    ) {
        return false;
    }

    return true;
}