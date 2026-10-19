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

export const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);
app.use("/artists", artistRouter);
app.use("/countries", countryRouter);
app.use("/users", userRouter);
app.use("/playlists", playlistRouter);
app.use("/histories", historyRouter);
app.use("/albums", albumRouter);
app.use("/playlisttracks", playlistTrackRouter);
app.use("/albumtracks", albumTrackRouter);