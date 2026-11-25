import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import ForensicAnalysis from './pages/ForensicAnalysis/ForensicAnalysis';

export default function App() {
  const [page, setPage] = useState('home');
  const [health, setHealth] = useState('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then(response => response.json())
      .then(data => setHealth(`connected · v${data.version}`))
      .catch(() => setHealth('backend offline'))
  }, [])

  return (
    <div style={{ display: 'flex'}}>
      <Sidebar currentPage={page} onReplace={setPage} />

      <main style={{ flex: 1, padding: 32 }}>
        {page === 'Home' && <Home health={health} />}
        {page === 'Forensic Analysis' && <ForensicAnalysis />}
      </main>
    </div>
  )
}
