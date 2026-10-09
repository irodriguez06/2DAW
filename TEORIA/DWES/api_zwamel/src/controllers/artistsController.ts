import { Response, Request } from "express";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from "../serveis/track/artist/artistService";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../data/track/artist/artist";

export function getAllArtistController(_req : Request, res : Response):Response {
     return res.status(200).json(getAllArtists());
} 

export function getArtistByIdController(req: Request, res: Response):Response {
    const artist: ArtistBD | undefined = getArtistById(req.params.id as string);
    
        if (!artist) {
            return res.status(404).json({message: `Artist not found`});
        }
        return res.status(200).json(artist);
}

export function postArtistController(req: Request, res: Response):Response {
    const result: CreateSuccessService<ArtistBD> | ErrorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    artists.push((result as CreateSuccessService<ArtistBD>).data);
    return res.status(result.code).json(result);
};

export function putArtistController(req: Request, res: Response):Response {
    const result: UpdateSuccessService<ArtistBD> | ErrorService = updateArtist(
            req.params.id as string,
            req.body,
        );

        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }

        const index: number = (result as UpdateSuccessService<ArtistBD>).index;
        artists[index] = (result as UpdateSuccessService<ArtistBD>).data;

        return res.status(result.code).json(result);
    };


export function deleteArtistController(req: Request, res: Response):Response {
    const result: DeleteSuccessService | ErrorService = deleteArtist(req.params.id as string);

        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }

        const index: number = (result as DeleteSuccessService).index;
        artists.splice(index, 1);

        return res.status(result.code).json(result);
    };

