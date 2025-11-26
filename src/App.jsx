import { Routes, Route } from 'react-router-dom'
import PlayerList from './pages/PlayerList'
import PlayerDetail from './pages/PlayerDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlayerList />} />
      <Route path="/player/:playerId" element={<PlayerDetail />} />
    </Routes>
  )
}

export default App