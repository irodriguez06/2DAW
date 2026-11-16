import { useEffect, useState } from "react";
import type { GETTrack } from "../../APIManagment/Tracks/Interfaces/Track";
import AddSongForm from "../../Components/Songs/AddSongForm";
import ListSongs from "../../Components/Songs/ListSongs";
import Reproduint from "../../Components/Reproduint/reproduint";
import { ENV } from "../../Config/env";

const SongManagement = () => {
    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState(false);
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
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Error carregant les cançons.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void carregarDadesTrack();
    }, []);

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
                                onPlay={(selectedTrack) => setPlayingTrackTitle(selectedTrack.title)}
                            />
                        </tbody>
                    </table>
                </section>
            ) : (
                <p>No hi ha cançons disponibles.</p>
            )}

            <button type="button" onClick={() => setNewSong((visible) => !visible)}>
                {newSong ? "Tanca el formulari" : "Nova cançó"}
            </button>

            {newSong && <AddSongForm refreshSongs={carregarDadesTrack} />}

            <Reproduint
                playingTrackTitle={playingTrackTitle}
                stop={() => setPlayingTrackTitle(null)}
            />
        </main>
    );
};

export default SongManagement;
