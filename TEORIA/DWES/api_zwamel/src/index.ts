import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { TrackBD } from "./interfaces/track/trackBD";
import { tracks } from "./data/track/track";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.Validator";
import { randomUUID } from "crypto";
import { artists } from "./data/track/artist/artist";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { isValidArtist } from "./validators/artistValidator";

const port: number = 3000;

const app: Express = express();
app.use(express.json());

// Gets

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(tracks);
});

app.get("/artists", (_req: Request, res: Response) => {
    return res.status(200).json(artists);
});

// get de id

app.get("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;
    const findTrack: TrackBD | undefined = tracks.find((t: TrackBD) => t.id === idTrack);

    if (!findTrack) {
        return res.status(404).json({message: `Track not found`});
    }
    return res.status(200).json(findTrack);
});

app.get("/artists/:id", (req: Request, res: Response) => {
    const idArtist: string = req.params.id as string;
    const artist: ArtistBD[] = artists.filter(
        (a: ArtistBD) => {return a.id === idArtist}
    );

    if (artist.length === 0) {
        return res.status(404).json({message: `Artist ${idArtist} not found`});
    }
    return res.status(200).json(artist);
});

// posts

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

app.post("/artists", (req: Request, res: Response) => {
    const artist: ArtistBD = req.body;
    if (!isValidArtist(artist)) {
        return res.status(400).json({ message: "Invalid data"});
    };

    const uuid:string = randomUUID();

    const artistRecord: ArtistBD = {
        id: uuid,
        nom: artist.nom.trim().replace("/\s+/g", " "),
        alias: artist.alias.trim().replace("/\s+/g", " "),
        pais: artist.pais.trim().replace("/\s+/g", " "),
    };

    //important: fer push
    artists.push(artistRecord);
    return res.status(201).json(artist);
});

// puts
app.put('/tracks/:id', (req: Request, res: Response) => {
    const track: Track = req.body;

    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    
    const idTrack: string = req.params.id as string;
    const index: number = tracks.findIndex((t: TrackBD) => t.id === idTrack);
    if (index === -1) {
        return res.status(404).json({message: `Track not found`});
    }

    tracks [index] = {
        id: idTrack,
        title: track.title.trim().replace("/\s+/g", " "),
        artist: track.artist.trim().replace("/\s+/g", " "),
        duration: track.duration,
    };

    return res.status(200).json(tracks[index]);
});

// delete
app.delete('/tracks/:id', (req: Request, res: Response) => {
    
    const idTrack: string = req.params.id as string;
    const index: number = tracks.findIndex((t: TrackBD) => t.id === idTrack);
    if (index === -1) {
        return res.status(404).json({message: `Track not found`});
    }

    tracks.splice(index, 1);

    return res.status(204).json({message: "Track deleted"});
});

// listen

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});