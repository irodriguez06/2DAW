import { useState } from 'react';
import './App.css'
import Header from './Components/Header'
import SongCard from './Components/Songs/SongCard'
import { tracks } from './Data/track';
import type { User } from './Model/User';
import type { TrackView } from './Components/Songs/Types/TrackView';
import type { Like } from './Components/Songs/Types/Like';

const userNames: string[] = ['Isaac', 'Bernardinho', 'Ayoub i força al canut', 'Pedro Sanchez'];
const randomUser: User = {
  name: userNames[Math.floor(Math.random() * userNames.length)]
};

function App() {

  const [track, setTrack] = useState<TrackView>(
    {
      ...tracks[Math.floor(Math.random() * tracks.length)],
      reproduccions: Math.floor(Math.random() * 1000),
      "likes": {
          like: false,
          totalLikes: 0
        }
    }
  );

  function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        "reproduccions": prev.reproduccions + 1,
      }
    }
    setTrack(tr);
  }

  function handleClickRandom() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...tracks[Math.floor(Math.random() * tracks.length)],
        "reproduccions": Math.floor(Math.random() * 1000),
        "likes": {
          like: false,
          totalLikes: 0
        }
      }
    }
    setTrack(tr);
  };

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {
      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;
      }
      const likeObj:Like = {
        like: !prev.likes.like,
        totalLikes: prev.likes.totalLikes + increment,
      }

      return {
        ...prev,
        "likes":likeObj,
      }
    }
    setTrack(tr);
  }

  return (
    <main>
      <Header user={randomUser} />
      <p><button type="button" onClick={handleClickRandom}>RandomTrack</button></p>
      <SongCard trackInfo={track} play={() => incrementarReproduccions()} like={() => gestionarLikes()}/>
    </main>
  )
}

export default App