import { Response, Request } from "express";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../serveis/track/user/userService";
import { UserBD } from "../interfaces/user/userBD";
import { users } from "../data/track/user/user";

export function getAllUsersController(_req : Request, res : Response):Response {
    return res.status(200).json(getAllUsers());
    } 

export function getTrackByIdController(req: Request, res: Response):Response {
    const user: UserBD | undefined = getUserById(req.params.id as string);
    
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    };

export function postUserController(req: Request, res: Response):Response {
    const result: CreateSuccessService<UserBD> | ErrorService = createUser(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        users.push((result as CreateSuccessService<UserBD>).data);
        return res.status(result.code).json(result);
    };

export function putUserController(req: Request, res: Response):Response {
    const result: UpdateSuccessService<UserBD> | ErrorService = updateUser(
            req.params.id as string,
            req.body,
        );
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as UpdateSuccessService<UserBD>).index;
        users[index] = (result as UpdateSuccessService<UserBD>).data;
    
        return res.status(result.code).json(result);
    };

export function deleteUserController(req: Request, res: Response):Response {
    const result: DeleteSuccessService | ErrorService = deleteUser(req.params.id as string);

        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }

        const index: number = (result as DeleteSuccessService).index;
        users.splice(index, 1);

        return res.status(result.code).json(result);
    };

