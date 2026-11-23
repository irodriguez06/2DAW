import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router';
import Header from './Components/PageEstructure/Header/Header';
import Menu from './Components/PageEstructure/Header/Menu/Menu';
import Play from './Pages/Authenticated/Play';


function App() {
  return (
  <BrowserRouter>
  <Header title="Spotify" user={'Isaac'} />
  <Menu></Menu>
    <Routes>
      <Route path="/Play" element={<Play />} />
      {/* <Route path="/SongManagement" element={<SongManagement />} /> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App