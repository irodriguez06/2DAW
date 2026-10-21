import { User } from "../interfaces/user/user";
import { MAXUSERNAME } from "../interfaces/user/user.constants";

export function isValidUser(user: User): boolean {
    if (
        !user
        || typeof user.email !== "string"
        || typeof user.country !== "string"
    ) {
        return false;
    }

    const email: string = user.email.trim();
    const country: string = user.country.trim();

    if (email.length === 0 || email.length > MAXUSERNAME) { return false; }
    if (country.length === 0) { return false; }

    return true;
}