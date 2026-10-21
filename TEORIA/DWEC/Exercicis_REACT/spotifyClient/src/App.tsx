import './App.css'
import SongCard from './Components/Songs/SongCard'
import { tracks } from './Data/track';
import type { TrackView } from './Components/Songs/Types/TrackView';

const totalTracks:number = tracks.length;
const random:number = Math.floor(Math.random() * totalTracks);
const totalReproduccions:TrackView = {
  ...tracks[random],
  reproduccions: Math.floor(Math.random() * 1_000)
};

function App() {

  return (
    <>
      <SongCard trackInfo={totalReproduccions}/>
    </>
  )
}

export default App
