import { useEffect, useState } from 'react';

export default function App() {
  const [health, setHealth] = useState('verificando...')

  useEffect(() => {
    fetch('/api/health')
      .then(resposta => resposta.json())
      .then(dados => setHealth(`conectado · v${dados.versao}`))
      .catch(() => setHealth('backend offline'))
  }, [])

  return (
    <main>
      <h1>Meratan</h1>
      <p>Backend: {health}</p>
    </main>
  )
}
