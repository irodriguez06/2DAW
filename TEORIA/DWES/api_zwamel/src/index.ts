import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
// track
// artist
import { getAllTracksController } from "./controllers/tracksController";
import { trackRouter } from "./routes/trackRoutes";
import { getAllArtistController } from "./controllers/artistsController";
import { artistRouter } from "./routes/artistRoutes";
import { getAllCountriesController } from "./controllers/countriesController";
import { countryRouter } from "./routes/countryRoutes";
import { getAllUsersController } from "./controllers/usersController";
import { userRouter } from "./routes/userRoutes";
import { AlbumBD } from "./interfaces/album/albumBD";
import { albums } from "./data/track/albums/albums";
import { createAlbum, deleteAlbum, getAllAlbums, getAlbumById, updateAlbum } from "./serveis/track/album/albumService";
import { CreateSuccessService } from "./interfaces/error/createSuccessService";
import { ErrorService } from "./interfaces/error/errorService";
import { UpdateSuccessService } from "./interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "./interfaces/error/deleteSuccessService";

const port: number = 3000;

const app: Express = express();
app.use(express.json());

// get general

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(JSON.stringify(APICONFIG));
});

// track

app.use("/tracks", trackRouter);

app.get("/tracks", (_req: Request, res: Response) => {
    return getAllTracksController(_req, res);
});

// artist

app.use("/artist", artistRouter);

app.get("/artists", (_req: Request, res: Response) => {
    return getAllArtistController(_req, res);
});

// country

app.use("/countries", countryRouter);

app.get("/countries", (_req: Request, res: Response) => {
    return getAllCountriesController(_req, res);
}); 

// user

app.use("/users", userRouter);

app.get("/users", (_req: Request, res: Response) => {
    return getAllUsersController(_req, res);
});

// album

app.get("/albums", (_req: Request, res: Response) => {
    return res.status(200).json(getAllAlbums());
});

app.get("/albums/:id", (req: Request, res: Response) => {
    const album: AlbumBD | undefined = getAlbumById(req.params.id as string);

    if (!album) {
        return res.status(404).json({ message: "Album not found" });
    }
    return res.status(200).json(album);
});

app.post("/albums", (req: Request, res: Response) => {
    const result: CreateSuccessService<AlbumBD> | ErrorService = createAlbum(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    albums.push((result as CreateSuccessService<AlbumBD>).data);
    return res.status(result.code).json(result);
});

app.put("/albums/:id", (req: Request, res: Response) => {
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
});

app.delete("/albums/:id", (req: Request, res: Response) => {
    const result: DeleteSuccessService | ErrorService = deleteAlbum(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    albums.splice(index, 1);
    return res.status(result.code).json(result);
});

// listen

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});