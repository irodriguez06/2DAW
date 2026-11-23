import { Response, Request } from "express";
import { ErrorService } from "../interfaces/error/errorService";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, updateAlbum } from "../serveis/track/album/albumService";
import { AlbumBD } from "../interfaces/album/albumBD";

export async function getAllAlbumsController(_req: Request, res: Response): Promise<Response> {
    const albums: AlbumBD[] = await getAllAlbums();
    return res.status(200).json(albums);
}

export async function getAlbumByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<AlbumBD> | ErrorService = await getAlbumById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function postAlbumController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createAlbum(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function putAlbumController(req: Request, res: Response): Promise<Response> {
    const result: UpdateSuccessService<number> | ErrorService = await updateAlbum(
        req.params.id as string,
        req.body,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function deleteAlbumController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deleteAlbum(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}