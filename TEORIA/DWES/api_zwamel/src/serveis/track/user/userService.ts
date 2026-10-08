import { randomUUID } from "crypto";
import { users } from "../../../data/track/user/user";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { User } from "../../../interfaces/user/user";
import { UserBD } from "../../../interfaces/user/userBD";
import { isValidUser } from "../../../validators/userValidator";

export function getAllUsers(): UserBD[] {
    return users;
}

export function getUserById(idUser: string): UserBD | undefined {
    return users.find((user: UserBD) => user.id === idUser);
}

export function createUser(user: User): CreateSuccessService<UserBD> | ErrorService {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const userRecord: UserBD = {
        id: randomUUID(),
        email: user.email.trim(),
        country: user.country.trim(),
    };

    return { success: true, code: 201, data: userRecord };
}

export function updateUser(idUser: string, user: User): UpdateSuccessService<UserBD> | ErrorService {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = users.findIndex((existingUser: UserBD) => existingUser.id === idUser);
    if (index === -1) {
        return { success: false, code: 404, message: `User ${idUser} not found` };
    }

    const userRecord: UserBD = {
        id: idUser,
        email: user.email.trim(),
        country: user.country.trim(),
    };

    return { success: true, code: 200, data: userRecord, index };
}

export function deleteUser(idUser: string): DeleteSuccessService | ErrorService {
    const index: number = users.findIndex((user: UserBD) => user.id === idUser);

    if (index === -1) {
        return { success: false, code: 404, message: `User ${idUser} not found` };
    }

    return { success: true, code: 204, index };
}
