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
import { getAllArtistController, getArtistByIdController, postArtistController, putArtistController } from "./controllers/artistsController";
import { artistRouter } from "./routes/artistRoutes";
import { getAllCountriesController, getCountriesByIdController, postCountryController, putCountryController } from "./controllers/countriesController";
import { countryRouter } from "./routes/countryRoutes";

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

app.use("/artist", artistRouter);

app.get("/artists", (_req: Request, res: Response) => {
    return getAllArtistController(_req, res);
});

app.use("/countries", countryRouter);

app.get("/countries", (_req: Request, res: Response) => {
    return getAllCountriesController(_req, res);
}); 







app.get("/users", (_req: Request, res: Response) => {
    return res.status(200).json(getAllUsers());
});

// get de id

app.get("/users/:id", (req: Request, res: Response) => {
    const user: UserBD | undefined = getUserById(req.params.id as string);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
});

// posts




    

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