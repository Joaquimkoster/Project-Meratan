import { useEffect, useState } from 'react'

type Note = {
    id: number
    title: string
    content: string
    createdAt: string
}

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    function load() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
    }

    useEffect(() => {
        load()
    }, [])

    function save() {
        if (!title || !content) return

        fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        }).then(() => {
            setTitle('')
            setContent('')
            load()
        })
    }

    function remove(id: number) {
        fetch(`/api/notes/${id}`, { method: 'DELETE' })
            .then(() => load())
    }

    return (
        <div className="notes">
            <div className="notes-form">
                <input
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Escreva a nota..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button onClick={save}>Salvar nota</button>
            </div>

            {notes.map(note => (
                <div key={note.id} className="note">
                    <div className="note-header">
                        <strong>#{note.id} · {note.title}</strong>
                        <button onClick={() => remove(note.id)}>excluir</button>
                    </div>
                    <p>{note.content}</p>
                    <small>{new Date(note.createdAt).toLocaleString('pt-BR')}</small>
                </div>
            ))}
        </div>
    )
}