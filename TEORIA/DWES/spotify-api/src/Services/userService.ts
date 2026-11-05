import { randomUUID } from "crypto";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { UserBD } from "../interfaces/user/userBD";
import { users } from "../data/user/user";
import { User } from "../interfaces/user/user";
import { isValidUser } from "../validators/user.validator";

export function getAllUsers(): UserBD[] {
    return users;
}

export function getUserById(idUser: string): UserBD | undefined {
    return users.find((u: UserBD) => { return u.id === idUser });
}

export function createUser(user: User): CreateSuccessService<UserBD> | ErrorService {

    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idUser: string = randomUUID()

    const userRecord: UserBD = {
        id: idUser,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country,
    };

    return { success: true, code: 201, data: userRecord };
}

export function putUserById(user: User, idUser: string): UpdateSuccessService<UserBD> | ErrorService {


    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = users.findIndex((u: UserBD) => { return u.id === idUser; });
    if (index === -1) {
        return { success: false, code: 404, message: "User not found" };
    }

    const updatedUser: UserBD = {
        id: idUser,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country,
    };

    return { success: true, code: 200, index: index, data: updatedUser };
}


export function deleteUser(idUser: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = users.findIndex((user: UserBD) => user.id === idUser);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "User not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}