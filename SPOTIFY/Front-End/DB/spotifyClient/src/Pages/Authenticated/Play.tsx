import { useState, useEffect } from "react";
import type { AddHistory } from "../../APIManagment/History/Interfaces/HistoryCreate";
import type { GETTrack } from "../../APIManagment/Tracks/Interfaces/Track";
import Reproduint from "../../Components/Reproduint/reproduint";
import ListSongs from "../../Components/Songs/ListSongs";
import SongCard from "../../Components/Songs/SongCard";
import type { TrackView } from "../../Components/Songs/Types/TrackView";
import { ENV } from "../../Config/env";

type LikeAction = 1 | -1;

interface TrackLikeTotal {
  totalLikes: number;
  lastAction: LikeAction | null;
}

const Play = () => {

  const [tracks, setTracks] = useState<GETTrack[]>([]);
  const [track, setTrack] = useState<TrackView | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function carregarDadesTrack(): Promise<void> {
    const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
    const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
    setTracks(listTrack);
  }

  async function seleccionarTrack(selectedTrack: GETTrack): Promise<boolean> {
    const resposta: Response = await fetch(
      `${ENV.API_BASE_URL}/likes/track/${selectedTrack.id}`
    );
    if (!resposta.ok) {
      return false;
    }

    const likeTotal: TrackLikeTotal = await resposta.json() as TrackLikeTotal;
    const isLiked = likeTotal.lastAction === 1;
    setTrack({
      ...selectedTrack,
      reproduccions: 0,
      likes: {
        like: isLiked,
        totalLikes: isLiked ? 1 : 0
      }
    });
    return true;
  }

  useEffect(
    () => {
      void carregarDadesTrack();
    }, []);


  async function incrementarReproduccions() {
    if (track === null) {
      return false;
    }

    const newHistory: AddHistory = {
      user: "123",
      track: track.id
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

    // setTrack((prev) => prev === null || prev.id !== track.id
    //   ? prev
    //   : { ...prev, reproduccions: prev.reproduccions + 1 }
    // );
  }

  function handlePlay() {
    if (track === null) {
      return;
    }

    incrementarReproduccions();
    setIsPlaying(true);
  }


  function handleClickRandom() {
    if (tracks.length === 0) {
      return;
    }

    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    void play(randomTrack);
  }

  async function gestionarLikes(): Promise<void> {
    if (track === null) {
      return;
    }

    const likeValue: LikeAction = track.likes.like ? -1 : 1;
    const response: Response = await fetch(`${ENV.API_BASE_URL}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        track: track.id,
        like: likeValue
      })
    });

    if (!response.ok) {
      return;
    }

    setTrack((prev) => prev === null || prev.id !== track.id
      ? prev
      : {
        ...prev,
        likes: {
          like: likeValue === 1,
          totalLikes: likeValue === 1 ? 1 : 0
        }
      }
    );
  }

  function gestionarReset() {
    // setTrack((prev) => prev === null
    //   ? prev
    //   : { ...prev, reproduccions: 0 }
    // );
  }

  async function play(selectedTrack: GETTrack): Promise<void> {
    const trackLoaded = await seleccionarTrack(selectedTrack);
    if (trackLoaded) {
      setIsPlaying(true);
    }
  }

  return (
    <>
      <main>
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
                    play={play}
                  />
                </tbody>
              </table>
            </section>
            : <p>
              No track available
            </p>
        }
        {track !== null && (
          <section>
            <SongCard trackInfo={track} play={handlePlay} like={gestionarLikes} reset={gestionarReset} />
          </section>
        )}
        <p><button type="button" onClick={handleClickRandom}>Random</button></p>
        <Reproduint
          playingTrackTitle={isPlaying && track !== null ? track.title : null}
          stop={() => setIsPlaying(false)}
        />
      </main>
    </>
  );
};

export default Play;