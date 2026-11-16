import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './Components/PageEstructure/Header/Header'
import Play from './Pages/Authenticated/Play'
import Menu from './Components/PageEstructure/Header/Menu/Menu'
import SongManagement from './Pages/Admin/SongManagement'

function App() {
  return (
  <BrowserRouter>
  <Header title="Spotify" user={'Isaac'} />
  <Menu></Menu>
    <Routes>
      <Route path="/Play" element={<Play />} />
      <Route path="/SongManagement" element={<SongManagement />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App

//bon dia