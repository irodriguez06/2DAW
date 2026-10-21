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

const totalTracks:number = tracks.length;
const random:number = Math.floor(Math.random() * totalTracks);
const totalReproduccions:TrackView = {
  ...tracks[random],
  reproduccions: Math.floor(Math.random() * 1_000)
};

function App() {

  return (
    <main>
      <Header user={randomUser} />
      <SongCard trackInfo={totalReproduccions}/>
    </main>
  )
}

export default App
