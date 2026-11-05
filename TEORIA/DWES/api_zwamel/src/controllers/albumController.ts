import { Response, Request } from "express";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, updateAlbum } from "../serveis/track/album/albumService";
import { AlbumBD } from "../interfaces/album/albumBD";
import { albums } from "../data/track/albums/albums";
import { ErrorService } from "../interfaces/error/errorService";

export function getAllAlbumsController(_req : Request, res : Response):Response {
    return res.status(200).json(getAllAlbums());
} 

export function getAlbumByIdController(req: Request, res: Response):Response {
    const album: AlbumBD | undefined = getAlbumById(req.params.id as string);
    
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        return res.status(200).json(album);
    };

export function postAlbumController(req: Request, res: Response):Response {
    const result: CreateSuccessService<AlbumBD> | ErrorService = createAlbum(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        albums.push((result as CreateSuccessService<AlbumBD>).data);
        return res.status(result.code).json(result);
    };

export function putAlbumController(req: Request, res: Response):Response {
    const result: UpdateSuccessService<AlbumBD> | ErrorService = updateAlbum(
            req.params.id as string,
            req.body,
        );
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as UpdateSuccessService<AlbumBD>).index;
        albums[index] = (result as UpdateSuccessService<AlbumBD>).data;
        return res.status(result.code).json(result);
    };

export function deleteAlbumController(req: Request, res: Response):Response {
    const result: DeleteSuccessService | ErrorService = deleteAlbum(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    albums.splice(index, 1);
    return res.status(result.code).json(result);
};