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

function App() {

}

export default App