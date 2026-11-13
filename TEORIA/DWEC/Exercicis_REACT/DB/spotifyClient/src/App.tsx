import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './Components/Header/Header'
import Play from './Pages/Authenticated/Play'

function App() {
  return (
  <BrowserRouter>
  <Header title="Spotify" user={'Isaac'} />
    <Routes>
      <Route path="/Play" element={<Play />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App