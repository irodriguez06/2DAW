import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './Components/PageEstructure/Header/Header'
import Play from './Pages/Authenticated/Play'
import Menu from './Components/PageEstructure/Header/Menu/Menu'

function App() {
  return (
  <BrowserRouter>
  <Header title="Spotify" user={'Isaac'} />
  <Menu></Menu>
    <Routes>
      <Route path="/Play" element={<Play />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App