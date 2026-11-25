import type { LucideIcon } from 'lucide-react'
import './Tabs.css'

export type Tab = {
  id: string
  label: string
  icon: LucideIcon
  count?: number
}

type Props = {
  tabs: Tab[]
  currentTab: string
  onReplace: (id: string) => void
}

export default function Tabs({ tabs, currentTab, onReplace }: Props) {
  return (
    <div className="tabs">
      {tabs.map(tab => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            className={`tab ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => onReplace(tab.id)}
          >
            <Icon size={16} />
            {tab.label}
            {tab.count !== undefined && ` (${tab.count})`}
          </button>
        )
      })}
    </div>
  )
}