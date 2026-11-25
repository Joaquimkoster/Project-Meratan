import './Sidebar.css'

const pages = [
    'home',
    'forensic analysis'
]

type Props = {
    currentPage: string
    onReplace: (page: string) => void
}

export default function Sidebar({ currentPage, onReplace }: Props) {
    return (
        <aside className="sidebar">

            <nav>
                {pages.map(page => (
                    <button
                        key={page}
                        className={`sidebar-button ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onReplace(page)}
                    >
                        {page}
                    </button>
                ))}
            </nav>
        </aside>
    )
}