import { useEffect, useState } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import SongCard from './Components/Songs/SongCard'
import Reproduint from './Components/Reproduint/reproduint';
import type { TrackView } from './Components/Songs/Types/TrackView';
import { users } from './Data/user';
import type { Like } from './Components/Songs/Types/Like';
import ListSongs from './Components/Songs/ListSongs';
import { ENV } from './Config/env';
import type { GETTrack } from './APIManagment/Tracks/Interfaces/Track';
import type { AddHistory } from './APIManagment/History/Interfaces/HistoryCreate';

interface GETPlaylist {
  id: string;
  name?: string;
  title?: string;
}

interface GETPlaylistTrack {
  id: string;
  playlist: string;
  track: string;
}

function App() {

  const [tracks, setTracks] = useState<GETTrack[]>([]);
  const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(true);
  const [playlistsError, setPlaylistsError] = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<GETPlaylist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<GETTrack[]>([]);
  const [playlistTracksLoading, setPlaylistTracksLoading] = useState(false);
  const [playlistTracksError, setPlaylistTracksError] = useState<string | null>(null);
  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [track, setTrack] = useState<TrackView>(getRandomTrack);
  const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);

  async function carregarDadesTrack() {
    const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
    const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
    setTracks(listTrack)
  }

  async function carregarDadesPlaylist() {
    try {
      const resposta = await fetch(`${ENV.API_BASE_URL}/playlists`);
      if (!resposta.ok) {
        throw new Error(`Error carregant les playlists (${resposta.status})`);
      }
      const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
      setPlaylists(listPlaylist);
    } catch (error) {
      setPlaylistsError(error instanceof Error ? error.message : 'Error carregant les playlists');
    } finally {
      setPlaylistsLoading(false);
    }
  }

  async function seleccionarPlaylist(playlist: GETPlaylist) {
    setSelectedPlaylist(playlist);
    setPlaylistTracks([]);
    setPlaylistTracksError(null);
    setPlaylistTracksLoading(true);

    try {
      const [playlistTracksResponse, tracksResponse] = await Promise.all([
        fetch(`${ENV.API_BASE_URL}/playlisttracks`),
        fetch(`${ENV.API_BASE_URL}/tracks`)
      ]);

      if (!playlistTracksResponse.ok) {
        throw new Error(`Error carregant les cançons de la playlist (${playlistTracksResponse.status})`);
      }
      if (!tracksResponse.ok) {
        throw new Error(`Error carregant els tracks (${tracksResponse.status})`);
      }

      const playlistTrackLinks: GETPlaylistTrack[] =
        await playlistTracksResponse.json() as GETPlaylistTrack[];
      const allTracks: GETTrack[] = await tracksResponse.json() as GETTrack[];
      const selectedTracks = playlistTrackLinks
        .filter((link) => link.playlist === playlist.id)
        .map((link) => allTracks.find((trackItem) => trackItem.id === link.track))
        .filter((trackItem): trackItem is GETTrack => trackItem !== undefined);

      setPlaylistTracks(selectedTracks);
    } catch (error) {
      setPlaylistTracksError(
        error instanceof Error ? error.message : 'Error carregant les cançons de la playlist'
      );
    } finally {
      setPlaylistTracksLoading(false);
    }
  }

  useEffect(
    () => {
      carregarDadesTrack();
      carregarDadesPlaylist();
    }, []);


  function getRandomTrack(): TrackView {
    const random: number = Math.floor(Math.random() * tracks.length);
    const randomTrack: GETTrack = tracks[random];

    return {
      ...randomTrack,
      reproduccions: Math.floor(Math.random() * 10000),
      likes: {
        like: false,
        totalLikes: 0
      }
    };
  }

  async function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        reproduccions: prev.reproduccions + 1
      }
    }

    const newHistory:AddHistory = {
      user: "123",
      track: tracks[1].id
    }

    const response: Response = await fetch(
      "http://localhost:3000/traqcks/user/history",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newHistory)
      })

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      console.log(result);

    setTrack(tr);
  }

  function handlePlay() {
    incrementarReproduccions();
    setPlayingTrackTitle(track.title);
  }


  function handleClickRandom() {
    setTrack(() => ({
      ...getRandomTrack()
    }));
  }

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {
      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;
      }
      let likeObj: Like = {
        like: !prev.likes.like,
        totalLikes: prev.likes.totalLikes + increment
      };

      return {
        ...prev,
        likes: likeObj
      }
    }
    setTrack(tr);
  }

  function gestionarReset() {
    setTrack((prev) => ({
      ...prev,
      reproduccions: 0,
      likes: {
        like: false,
        totalLikes: 0
      }
    }));
  }

  return (
    <>
      <Header title="Spotify" user={randomUser.name} />
      <main>
        <div className="tracks-column">
          {
            tracks.length > 0 ?
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
              : <section className="tracks-panel">
                <h2>Tracks</h2>
                <p>No track available</p>
              </section>
          }

          <section className="playlists-panel">
            <h2>Playlists</h2>
            {playlistsLoading ? (
              <p>Carregant playlists...</p>
            ) : playlistsError !== null ? (
              <p role="alert">{playlistsError}</p>
            ) : playlists.length > 0 ? (
              <ul>
                {playlists.map((playlist) => (
                  <li key={playlist.id}>
                    {playlist.name ?? playlist.title ?? `Playlist ${playlist.id}`}
                    {' '}
                    <button type="button" onClick={() => seleccionarPlaylist(playlist)}>
                      Seleccionar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hi ha playlists disponibles.</p>
            )}
          </section>

          {selectedPlaylist !== null && (
            <section className="playlist-tracks-panel">
              <h2>
                Cançons de {selectedPlaylist.name ?? selectedPlaylist.title ?? `Playlist ${selectedPlaylist.id}`}
              </h2>
              {playlistTracksLoading ? (
                <p>Carregant cançons...</p>
              ) : playlistTracksError !== null ? (
                <p role="alert">{playlistTracksError}</p>
              ) : playlistTracks.length > 0 ? (
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
                      onPlay={(selectedTrack) => setPlayingTrackTitle(selectedTrack.title)}
                    />
                  </tbody>
                </table>
              ) : (
                <p>Aquesta playlist encara no té cançons.</p>
              )}
            </section>
          )}
        </div>

        <section>
          <SongCard trackInfo={track} play={handlePlay} like={() => gestionarLikes()} reset={() => gestionarReset()} />
        </section>
        <p><button onClick={handleClickRandom}>Random</button></p >
        <Reproduint
          playingTrackTitle={playingTrackTitle}
          stop={() => setPlayingTrackTitle(null)}
        />
      </main>
    </>
  )
}

export default App