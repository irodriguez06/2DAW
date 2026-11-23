import { tracks } from "../data/track/track";
import { users } from "../data/user/user";
import { History } from "../interfaces/history/history";
import { MAXDATE } from "../interfaces/history/history.constants";
import { TrackBD } from "../interfaces/track/trackBD";
import { UserBD } from "../interfaces/user/userBD";

export function isValidHistory(history: History): boolean | string | undefined {
    if (!history || !history.user || !history.track || !history.date) {
        return false;
    }

    const dateLength: number = history.date.trim().length;
    if (dateLength !== MAXDATE) {
        return false;
    }

    const userOK: UserBD | undefined = users.find(
        (user: UserBD) => { return user.id === history.user }
    );

    if (!userOK) {
        return false;
    }

    const trackOK: TrackBD | undefined = tracks.find(
        (track: TrackBD) => { return track.id === history.track }
    );

    if (!trackOK) {
        return false;
    }

    return true;
}
