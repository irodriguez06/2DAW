import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
// track
import { TrackBD } from "./interfaces/track/trackBD";
import { tracks } from "./data/track/track";
// artist
import { artists } from "./data/track/artist/artist";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "./serveis/track/trackService";
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from "./serveis/track/artist/artistService";
import { ErrorService } from "./interfaces/error/errorService";
import { CreateSuccessService } from "./interfaces/error/createSuccessService";
import { UpdateSuccessService } from "./interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "./interfaces/error/deleteSuccessService";

const port: number = 3000;

const app: Express = express();
app.use(express.json());

// Gets

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(getAllTracks());
});

app.get("/artists", (_req: Request, res: Response) => {
    return res.status(200).json(getAllArtists());
});

// get de id

app.get("/tracks/:id", (req: Request, res: Response) => {
    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string);

    if (!findTrack) {
        return res.status(404).json({message: `Track not found`});
    }
    return res.status(200).json(findTrack);
});

app.get("/artists/:id", (req: Request, res: Response) => {
    const artist: ArtistBD | undefined = getArtistById(req.params.id as string);

    if (!artist) {
        return res.status(404).json({message: `Artist not found`});
    }
    return res.status(200).json(artist);
});

// posts

app.post("/tracks", (req: Request, res: Response) => {

    const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const ErrorResult = result as ErrorService;
        return res.status(result.code).json({ message: ErrorResult.message });
    }

    tracks.push((result as CreateSuccessService<TrackBD>).data);
    return res.status(result.code).json(result);
});

app.post("/tracks", (req: Request, res: Response) => {
 
    const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);
 
    if (!result.success) {
        const ErrorResult = result as ErrorService;
        return res.status(result.code).json({ message: ErrorResult.message });
    }
 
    tracks.push((result as CreateSuccessService<TrackBD>).data);
    return res.status(result.code).json(result);
});

app.post("/artists", (req: Request, res: Response) => {
    const result: CreateSuccessService<ArtistBD> | ErrorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    artists.push((result as CreateSuccessService<ArtistBD>).data);
    return res.status(result.code).json(result);
});

// puts
app.put('/tracks/:id', (req: Request, res: Response) => {
    const result: UpdateSuccessService<TrackBD> | ErrorService = updateTrack(req.params.id as string, req.body);
 
    if (!result.success) {
        const ErrorResult = result as ErrorService;
        return res.status(result.code).json({ message: ErrorResult.message });
    }
 
    const index:number = (result as UpdateSuccessService<TrackBD>).index;
    tracks[index] = (result as UpdateSuccessService<TrackBD>)['data'];
 
    return res.status(result.code).json(result);
});

app.put("/artists/:id", (req: Request, res: Response) => {
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
});

// delete
app.delete('/tracks/:id', (req: Request, res: Response) => {
    const result: DeleteSuccessService | ErrorService = deleteTrack(req.params.id as string);

    if (!result.success) {
        const ErrorResult = result as ErrorService;
        return res.status(result.code).json({ message: ErrorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    tracks.splice(index, 1);

    return res.status(result.code).json(result);
});

app.delete("/artists/:id", (req: Request, res: Response) => {
    const result: DeleteSuccessService | ErrorService = deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    artists.splice(index, 1);

    return res.status(result.code).json(result);
});

// listen

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});