import './ForensicAnalysis.css'
import { useState } from 'react'
import Tabs, { type Tab } from '../../components/Tabs/Tabs'
import { Paperclip, FileText, Trash2 } from 'lucide-react'
import Notes from './Cards/Notes/Notes'

const tabs: Tab[] = [
  { id: 'file-analysis', label: 'File Analysis', icon: Paperclip },
  { id: 'notes', label: 'Notes', icon: FileText },
]

export default function ForensicAnalysis() {
  const [tab, setTab] = useState('file-analysis')
  const [version, setVersion] = useState(0)

  function clearAll() {
    const ok = confirm('Apagar TODAS as informações da análise forense? Isso não pode ser desfeito.')
    if (!ok) return

    fetch('/api/forensic', { method: 'DELETE' })
      .then(() => setVersion(v => v + 1))
  }

  return (
    <div className="forensic">
      <div className="forensic-top">
        <Tabs tabs={tabs} currentTab={tab} onReplace={setTab} />
        <button className="clear-button" onClick={clearAll}>
          <Trash2 size={14} /> Apagar tudo
        </button>
      </div>

      <div key={version}>
        {tab === 'notes' && <Notes />}
      </div>
    </div>
  )
}