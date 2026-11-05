import { useState } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import SongCard from './Components/Songs/SongCard'
import Reproduint from './Components/Reproduint/Reproduint';
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track';
import type { Track } from './Model/Track';
import { users } from './Data/User';
import type { Like } from './Components/Songs/Types/Like';
import ListSongs from './Components/Songs/ListSongs';
import Historial from './Components/Historial/Historial';
import type { HistoryEntry } from './Components/Historial/Types/HistoryEntry';



function getRandomTrack(): TrackView {
  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const randomTrack: Track = tracks[random];

  return {
    ...randomTrack,
    reproduccions: Math.floor(Math.random() * 10000),
    likes: {
      like: false,
      totalLikes: 0
    }
  };
}

function App() {

  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [track, setTrack] = useState<TrackView>(getRandomTrack);
  const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        reproduccions: prev.reproduccions + 1
      }
    }
    setTrack(tr);
  }

  function handlePlay() {
    incrementarReproduccions();
    setPlayingTrackTitle(track.title);
    setHistory((previousHistory) => [
      ...previousHistory,
      {
        id: previousHistory.length,
        title: track.title,
        playedAt: new Date()
      }
    ]);
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
      <main className="content-layout">
        <div className="song-lists">
          <table>
            <caption>Cançons existents</caption>
            <tbody>
              <ListSongs tracks={tracks} />
            </tbody>
          </table>
          <Historial entries={history} />
        </div>
        <section>
          <SongCard trackInfo={track} isPlaying={playingTrackTitle !== null} play={handlePlay} like={() => gestionarLikes()} reset={() => gestionarReset()} />
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