import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { trackRouter } from "./routes/trackRoutes";
import { artistRouter } from "./routes/artistRoutes";
import { countryRouter } from "./routes/countryRoutes";
import { userRouter } from "./routes/userRoutes";
import { playlistRouter } from "./routes/playlistRoutes";
import { historyRouter } from "./routes/historyRoutes";
import { albumRouter } from "./routes/albumRoutes";
import { playlistTrackRouter } from "./routes/playlistTrackRoutes";
import { albumTrackRouter } from "./routes/albumTrackRoutes";
import cors from "cors";
import { corsOptions } from "./config/cors";

export const app: Express = express();

app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter); // fet
app.use("/artists", artistRouter); // fet
app.use("/countries", countryRouter); // fet
app.use("/users", userRouter); // fet
app.use("/playlists", playlistRouter);
app.use("/histories", historyRouter);
app.use("/albums", albumRouter);
app.use("/playlisttracks", playlistTrackRouter);
app.use("/albumtracks", albumTrackRouter);