import { Response, Request } from "express";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../Services/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { tracks } from "../data/track/track";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { createUser, deleteUser, getAllUsers, getUserById, putUserById } from "../Services/userService";
import { users } from "../data/user/user";
import { UserBD } from "../interfaces/user/userBD";

export function getAllUsersController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllUsers());
}

export function getUserByIdController(req: Request, res: Response): Response {
    const user: UserBD | undefined = getUserById(req.params.id as string);

    if (!user) {
        return res.status(404).json({ message: `User not found` });
    }
    return res.status(200).json(user);

}

export function postUserController(req: Request, res: Response): Response {
    const result: CreateSuccessService<UserBD> | ErrorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    users.push((result as CreateSuccessService<UserBD>).data);
    return res.status(result.code).json(result);

}


export function putUserController(req: Request, res: Response): Response {
    const result: UpdateSuccessService<UserBD> | ErrorService = putUserById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<UserBD>).index;
    users[index] = (result as UpdateSuccessService<UserBD>).data;

    return res.status(result.code).json(result);
}

export function deleteUserController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deleteUser(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    users.splice(index, 1);

    return res.status(result.code).json(result);
}