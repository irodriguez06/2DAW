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
import { getAllAlbumsController } from "./controllers/albumController";
import { albumRouter } from "./routes/albumRoutes";

const port: number = 3000;

const app: Express = express();
app.use(express.json());

// get general

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(JSON.stringify(APICONFIG));
});

// track

app.use("/tracks", trackRouter);
// artist

app.use("/artist", artistRouter);

// country

app.use("/countries", countryRouter);

// user

app.use("/users", userRouter);

// album

app.use("/album", albumRouter);

// listen

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});