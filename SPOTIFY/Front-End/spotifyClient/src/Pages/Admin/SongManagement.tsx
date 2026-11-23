import { useEffect, useState } from "react";
import type { GETTrack } from "../../APIManagment/Tracks/Interfaces/Track";
import AddSongForm from "../../Components/Songs/AddSongForm";
import ListSongs from "../../Components/Songs/ListSongs";
import Reproduint from "../../Components/Reproduint/reproduint";
import { ENV } from "../../Config/env";
import type { FormState } from "./Types/FormState";
import type { Track } from "../../Model/Track";
import type { TrackCreate } from "../../APIManagment/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagment/Tracks/PostTrack";
import { PutTrack } from "../../APIManagment/Tracks/PutTrack";

const SongManagement = () => {
    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<FormState>( { mode:"none" } );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);

    async function carregarDadesTrack(): Promise<void> {
        try {
            const response = await fetch(`${ENV.API_BASE_URL}/tracks`);
            if (!response.ok) {
                throw new Error(`Error carregant les cançons (${response.status})`);
            }

            const listTrack: GETTrack[] = await response.json() as GETTrack[];
            setError(null);
            setTracks(listTrack);
            console.log(listTrack);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Error carregant les cançons.");
        } finally {
            setLoading(false);
        }
    }

    function edit(t:Track) {
        setNewSong( 
            {
                mode: "edit",
                song: t
            } 
        );
    }

    function addSong() {
        setNewSong({ mode: "new" });
    }

    useEffect(() => {
        void carregarDadesTrack();
    }, []);

    async function save(t:TrackCreate) {
        await PostTrack(t);
        await carregarDadesTrack();
        setNewSong({mode: "none"});
    }

    async function update(t:TrackCreate) {
        const id=newSong.mode==="edit"?newSong.song?.id:"";
        await PutTrack(t,id);
        await carregarDadesTrack();
        setNewSong({mode: "none"});
    }

    return (
        <main>
            <h1>Llistat de cançons</h1>

            {loading ? (
                <p>Carregant cançons...</p>
            ) : error !== null ? (
                <p role="alert">{error}</p>
            ) : tracks.length > 0 ? (
                <section className="tracks-panel">
                    <h2>Tracks</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Cançó</th>
                                <th>Artista</th>
                                <th>Durada</th>
                                <th>Reproducció</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListSongs
                                tracks={tracks}
                                edit={edit}
                                onPlay={(selectedTrack) => setPlayingTrackTitle(selectedTrack.title)}
                            />
                        </tbody>
                    </table>
                </section>
            ) : (
                <p>No hi ha cançons disponibles.</p>
            )}

            {newSong.mode === "none" ? (
                <button type="button" onClick={addSong}>Afegir cançó</button>
            ) : (
                <button type="button" onClick={() => setNewSong({ mode: "none" })}>
                    Tanca el formulari
                </button>
            )}

            {newSong.mode === "new" && <AddSongForm submit={save} />}
            {newSong.mode === "edit" && (
                <AddSongForm submit={update} song={newSong.song} />
            )}

            <Reproduint
                playingTrackTitle={playingTrackTitle}
                stop={() => setPlayingTrackTitle(null)}
            />
        </main>
    );
};

export default SongManagement;
