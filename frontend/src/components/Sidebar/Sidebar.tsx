import './Sidebar.css'

const pages = [
    'home',
    'forensic analysis'
]

type Props = {
    currentPage: string
    onreplace: (page: string) => void
}

export default function Sidebar({ currentPage, onreplace }: Props) {
    return (
        <aside className="sidebar">

            <nav>
                {pages.map(page => (
                    <button
                        key={page}
                        className={`sidebar-button ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onreplace(page)}
                    >
                        {page}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">v0.0.1</div>
        </aside>
    )
}