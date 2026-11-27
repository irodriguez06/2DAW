import { useEffect, useState } from "react";
import type { GETTrack } from "../../APIManagment/Tracks/Interfaces/Track";
import ListSongs from "../../Components/Songs/ListSongs";
import { ENV } from "../../Config/env";
import type { Track } from "../../Model/Track";
import type { FormState } from "./Types/FormState";
import type { TrackCreate } from "../../APIManagment/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagment/Tracks/PostTrack";
import { PutTrack } from "../../APIManagment/Tracks/PutTrack";
import AddSongForm from "../../Components/Songs/AddSongForm";
import Reproduint from "../../Components/Reproduint/reproduint";

interface GETPlaylist {
    id: string;
    name?: string;
    title?: string;
}

interface GETPlaylistTracks {
    id: string;
    playlist: string;
    track: string;
}

const SongManagement = () => {
    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<FormState>({ mode: "none" });
    const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);
    const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<GETPlaylist | null>(null);
    const [playlistTracks, setPlaylistTracks] = useState<GETTrack[]>([]);

    async function carregarDadesTrack(): Promise<void> {
        const response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        if (!response.ok) {
            throw new Error(`Error carregant les cançons (${response.status})`);
        }

        const listTrack: GETTrack[] = await response.json() as GETTrack[];
        setTracks(listTrack);
        console.log(listTrack);
    }

    async function carregarDadesPlaylist(): Promise<void> {
        const response = await fetch(`${ENV.API_BASE_URL}/playlists`);
        const listPlaylist: GETPlaylist[] = await response.json() as GETPlaylist[];
        setPlaylists(listPlaylist);
    }

    async function seleccionarPlaylist(playlist: GETPlaylist): Promise<void> {
        setSelectedPlaylist(playlist);
        setPlaylistTracks([]);

        const [playlistTracksResponse, tracksResponse] = await Promise.all([
            fetch(`${ENV.API_BASE_URL}/playlisttracks`),
            fetch(`${ENV.API_BASE_URL}/tracks`)
        ]);

        const playlistTrackLinks: GETPlaylistTracks[] =
            await playlistTracksResponse.json() as GETPlaylistTracks[];
        const allTracks: GETTrack[] = await tracksResponse.json() as GETTrack[];
        const selectedTracks = playlistTrackLinks
            .filter((link) => link.playlist === playlist.id)
            .map((link) => allTracks.find((trackItem) => trackItem.id === link.track))
            .filter((trackItem): trackItem is GETTrack => trackItem !== undefined);

        setPlaylistTracks(selectedTracks);
    }

    function edit(t: Track) {
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
        void carregarDadesPlaylist();
    }, []);

    async function save(t: TrackCreate) {
        await PostTrack(t);
        await carregarDadesTrack();
        setNewSong({ mode: "none" });
    }

    async function update(t: TrackCreate) {
        const id = newSong.mode === "edit" ? newSong.song?.id : "";
        await PutTrack(t, id);
        await carregarDadesTrack();
        setNewSong({ mode: "none" });
    }

    function handlePlay(track: GETTrack) {
        setPlayingTrackTitle(track.title);
    }

    return (
        <main className="song-management">
            <h1>Llistat de cançons</h1>


            {tracks.length > 0
                ? <section className="tracks-panel">
                        <h2>Tracks</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cançó</th>
                                    <th>Artista</th>
                                    <th>Durada</th>
                                    <th>Reproducció</th>
                                    <th>Accions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ListSongs
                                    tracks={tracks}
                                    play={handlePlay}
                                    edit={edit}
                                />
                            </tbody>
                        </table>
                    </section>
                 : <p>No hi ha cançons disponibles.</p>
            }

            <section className="playlists-panel">
                <h2>Playlists</h2>
                <ul>
                    {playlists.map((playlist) => (
                        <li key={playlist.id}>
                            <button type="button" onClick={() => seleccionarPlaylist(playlist)}>
                                {playlist.name ?? playlist.title ?? `Playlist ${playlist.id}`}
                            </button>
                        </li>
                    ))}
                </ul>

                {selectedPlaylist !== null && (
                    <section className="playlist-tracks-panel">
                        <h2>
                            Cançons de {selectedPlaylist.name ?? selectedPlaylist.title ?? `Playlist ${selectedPlaylist.id}`}
                        </h2>
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
                                    tracks={playlistTracks}
                                    play={handlePlay}
                                />
                            </tbody>
                        </table>
                    </section>
                )}
            </section>

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
