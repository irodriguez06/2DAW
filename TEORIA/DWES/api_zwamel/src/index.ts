import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { TrackBD } from "./interfaces/track/trackBD";
import { tracks } from "./data/track/track";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.Validator";
import { randomUUID } from "crypto";

const port: number = 3000;

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(tracks);
});

app.get("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;
    const track: TrackBD[] = tracks.filter(
        (t:TrackBD) => {return t.id === idTrack}
    );

    if (track.length === 0) {
        return res.status(404).json({message: `Track ${idTrack} not found`});
    }
    return res.status(200).json(track);
});

// saber totes les llistes de reproducció d'un usuari
// /usuaris/:id/playlists
// les ultimes cancons que ha escoltat un usuari
// /usuaris/:id/songs/latest
// ultimes cancones carregades al aplicatiu
// /songs/uploaded/latest
// totes cancons d'una playlist d'un usuari
// /usuaris/:id/playlist/:idPlaylist/songs
// el meu perfil
// /usaris/profile
// el perfil d'un altre usuari
// /usuaris/:id/profile
// musica mes reproduida
// /songs/popular
// mes reproduida d'un artista
// /artist/:id/songs/popular
// artista amb mes reproduccions i oyents
// /artist/followers/popular
// /artist/users/reproductions

app.post("/tracks", (req: Request, res: Response) => {
    const track:Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "Invalid data"});
    };

    const uuid:string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace("/\s+/g", " "),
        artist: track.artist.trim().replace("/\s+/g", " "),
        duration: track.duration,
    };

    //important: fer push
    tracks.push(trackRecord);
    return res.status(201).json(track);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});