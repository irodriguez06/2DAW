import { History } from "../interfaces/history/history";
import { MAXHISTORYDATA } from "../interfaces/history/history.constants";
import { MAXTITOL } from "../interfaces/track/track.constants";
import { MAXUSERNAME } from "../interfaces/user/user.constants";

export function isValidHistory(history: History): boolean {

    if (!history.user || !history.data || !history.track) {
        return false;
    }

    const user: string = history.user.trim();
    const data: string = history.data.trim();
    const track: string = history.track.trim();

    if (user.length === 0 || user.length > MAXUSERNAME) { return false; }
    if (data.length === 0 || data.length > MAXHISTORYDATA) { return false; }
    if (track.length === 0 || track.length > MAXTITOL) { return false; }

    return true;
}