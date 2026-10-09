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
import { CountryBD } from "./interfaces/country/countryBD";
import { countries } from "./data/track/countries/countries";
import { createCountry, getAllCountries, getCountryById, updateCountry } from "./serveis/track/country/countryService";
import { UserBD } from "./interfaces/user/userBD";
import { users } from "./data/track/user/user";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "./serveis/track/user/userService";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, putTrackController } from "./controllers/tracksController";
import { trackRouter } from "./routes/trackRoutes";

const port: number = 3000;

const app: Express = express();
app.use(express.json());

// Gets

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.get("/tracks", (_req: Request, res: Response) => {
    return getAllTracksController(_req, res);
});

app.get("/artists", (_req: Request, res: Response) => {
    return res.status(200).json(getAllArtists());
});

app.get("/countries", (_req: Request, res: Response) => {
    return res.status(200).json(getAllCountries());
});

app.get("/users", (_req: Request, res: Response) => {
    return res.status(200).json(getAllUsers());
});

// get de id

app.get("/artists/:id", (req: Request, res: Response) => {
    const artist: ArtistBD | undefined = getArtistById(req.params.id as string);

    if (!artist) {
        return res.status(404).json({message: `Artist not found`});
    }
    return res.status(200).json(artist);
});

app.get("/countries/:id", (req: Request, res: Response) => {
    const country: CountryBD | undefined = getCountryById(req.params.id as string);

    if (!country) {
        return res.status(404).json({ message: "Country not found" });
    }
    return res.status(200).json(country);
});

app.get("/users/:id", (req: Request, res: Response) => {
    const user: UserBD | undefined = getUserById(req.params.id as string);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
});

// posts

app.post("/artists", (req: Request, res: Response) => {
    const result: CreateSuccessService<ArtistBD> | ErrorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    artists.push((result as CreateSuccessService<ArtistBD>).data);
    return res.status(result.code).json(result);
});

app.post("/countries", (req: Request, res: Response) => {
    const result: CreateSuccessService<CountryBD> | ErrorService = createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    countries.push((result as CreateSuccessService<CountryBD>).data);
    return res.status(result.code).json(result);
});

app.post("/users", (req: Request, res: Response) => {
    const result: CreateSuccessService<UserBD> | ErrorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    users.push((result as CreateSuccessService<UserBD>).data);
    return res.status(result.code).json(result);
});

// puts

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

app.put("/countries/:id", (req: Request, res: Response) => {
    const result: UpdateSuccessService<CountryBD> | ErrorService = updateCountry(
        req.params.id as string,
        req.body,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<CountryBD>).index;
    countries[index] = (result as UpdateSuccessService<CountryBD>).data;

    return res.status(result.code).json(result);
});

app.put("/users/:id", (req: Request, res: Response) => {
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
});

// delete

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

app.delete("/users/:id", (req: Request, res: Response) => {
    const result: DeleteSuccessService | ErrorService = deleteUser(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    users.splice(index, 1);

    return res.status(result.code).json(result);
});

// listen

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});