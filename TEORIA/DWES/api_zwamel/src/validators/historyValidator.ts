import { History } from "../interfaces/history/history";
import { MAXHISTORYDATA } from "../interfaces/history/history.constants";

export function isValidHistory(history: History): boolean {
    if (
        !history
        || typeof history.user !== "string"
        || typeof history.data !== "string"
        || typeof history.track !== "string"
    ) {
        return false;
    }

    const user: string = history.user.trim();
    const data: string = history.data.trim();
    const track: string = history.track.trim();

    return user.length > 0
        && track.length > 0
        && data.length > 0
        && data.length <= MAXHISTORYDATA
        && !Number.isNaN(Date.parse(data));
}
