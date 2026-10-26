import { useState } from 'react';
import './App.css'
import Header from './Components/Header'
import SongCard from './Components/Songs/SongCard'
import { tracks } from './Data/track';
import type { User } from './Model/User';
import type { TrackView } from './Components/Songs/Types/TrackView';

const userNames: string[] = ['Isaac', 'Bernardinho', 'Ayoub i força al canut', 'Pedro Sanchez'];
const randomUser: User = {
  name: userNames[Math.floor(Math.random() * userNames.length)]
};

function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>( 
    () => Math.floor(Math.random() * tracks.length)
  );
  const [reproduccions] = useState<number>(() => Math.floor(Math.random() * 1_000));
  const [likes] = useState<number>(() => Math.floor(Math.random() * 20));

  function handleClickRandom() {
    setCurrentTrackIndex((currentIndex) => {
      const otherTrackIndexes = tracks
        .map((_, index) => index)
        .filter((index) => index !== currentIndex);

      if (otherTrackIndexes.length === 0) {
        return currentIndex;
      }

      const randomIndex = Math.floor(Math.random() * otherTrackIndexes.length);
      return otherTrackIndexes[randomIndex];
    });
  }

  const trackInfo: TrackView = {
    ...tracks[currentTrackIndex],
    reproduccions,
    likes
  };

  return (
    <main>
      <Header user={randomUser} />
      <SongCard trackInfo={trackInfo}/>
      <p><button type="button" onClick={handleClickRandom}>RandomTrack</button></p>
    </main>
  )
}

export default App
