import { Response, Request } from "express";
import { ErrorService } from "../interfaces/error/errorService";

import { createArtist, getAllArtists, getArtistById} from "../serveis/track/artist/artistService";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";

export async function getAllArtistController(_req: Request, res: Response): Promise<Response> {
    const artists: ArtistBD[] = await getAllArtists();
    return res.status(200).json(artists);
}

export async function getArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<ArtistBD> | ErrorService = await getArtistById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function postArtistController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}