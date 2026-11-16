import { useEffect, useState, type SubmitEvent } from "react";
import { ENV } from "../../Config/env";
import type { GETArtist } from "../../APIManagment/Artist/Interfaces/Artist";
import type { TrackCreate } from "../../APIManagment/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagment/Tracks/PostTrack";
import type { AddSongFormProps } from "./Types/AddSongFormProps";

const AddSongForm = (props:AddSongFormProps) => {
    const [artists, setArtists] = useState<GETArtist[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function carregarArtists() {
        try {
            const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
            if (!resposta.ok) {
                throw new Error(`Error carregant els artistes (${resposta.status})`);
            }
            const listArtist: GETArtist[] = await resposta.json() as GETArtist[];
            setArtists(listArtist);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Error carregant els artistes.");
        }
    }

    useEffect(() => {
        void carregarArtists();
    }, []);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const dades = new FormData(event.currentTarget);

        const song:TrackCreate = {
            title: String(dades.get("title") ?? "").trim(),
            artist: String(dades.get("artist") ?? "").trim(),
            duration: Number(dades.get("duration")),
        };

        try {
            await PostTrack(song);
            await props.refreshSongs();
            form.reset();
            setError(null);
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Error afegint la cançó.");
        }
    }

    return (
        <>
        <h1>Afegir cançó</h1>
        <form onSubmit={handleSubmit}>
            <p>
                <label>
                    Titol: <input type="text" name="title" required />
                </label>
            </p>
            <p>
                <label>
                    Artista: <select name="artist" required defaultValue="">
                        <option value="" disabled>Selecciona un artista</option>
                        {
                        artists.map(
                            (a: GETArtist) => (
                                <option key={a.id} value={a.id}>{a.nom}</option>
                            )
                        )}
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Durada: <input type="text" name="duration" required />
                </label>
            </p>
            <p>
                <input type="submit" value="Afegir cançó" />
            </p>
            {error !== null && <p role="alert">{error}</p>}
        </form>
        </>
    
    )
}

export default AddSongForm;