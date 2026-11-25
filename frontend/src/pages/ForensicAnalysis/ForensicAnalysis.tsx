import './ForensicAnalysis.css'
import { useState } from 'react'
import Tabs, { Tab } from '../../components/Tabs/Tabs'
import { Paperclip } from 'lucide-react'

const tabs: Tab[] = [
  { id: 'file-analysis', label: 'File Analysis', icon: Paperclip },
]

export default function ForensicAnalysis() {
    const [tab, setTab] = useState('file-analysis')

    return (
        <div className="forensic">
            <Tabs tabs={tabs} currentTab={tab} onReplace={setTab} />
        </div>
    )
}