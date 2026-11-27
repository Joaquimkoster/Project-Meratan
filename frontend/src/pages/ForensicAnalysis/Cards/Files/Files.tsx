import { useEffect, useState } from 'react'

type StoredFile = {
  id: number
  originalName: string
  contentType: string | null
  sizeBytes: number
  sha256: string
  uploadedAt: string
}

function formatSize(b: number) {
  if (b < 1024) return `${b} B`
  if (b < 1024 ** 2) return `${(b / 1024).toFixed(1)} KB`
  if (b < 1024 ** 3) return `${(b / 1024 ** 2).toFixed(1)} MB`
  return `${(b / 1024 ** 3).toFixed(1)} GB`
}

export default function Files() {
  const [files, setFiles] = useState<StoredFile[]>([])
  const [sending, setSending] = useState(false)

  const load = () =>
    fetch('/api/files')
      .then(r => (r.ok ? r.json() : []))
      .then(data => setFiles(Array.isArray(data) ? data : []))
  useEffect(() => { load() }, [])

  async function upload(list: FileList | null) {
    if (!list || list.length === 0) return
    setSending(true)
    for (const file of Array.from(list)) {
      const form = new FormData()
      form.append('file', file)
      await fetch('/api/files', { method: 'POST', body: form })
    }
    setSending(false)
    load()
  }

  async function remove(id: number) {
    await fetch(`/api/files/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="files">
      <label
        className="files-drop"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); upload(e.dataTransfer.files) }}
      >
        <input type="file" multiple hidden
          onChange={e => { upload(e.target.files); e.target.value = '' }} />
        {sending ? 'Enviando...' : 'Clique ou arraste arquivos aqui'}
      </label>

      <div className="lista-arquivos">
        {files.map(f => (
          <div key={f.id} className="note">
            <div className="note-header">
              <a href={`/api/files/${f.id}`} target="_blank" rel="noreferrer">
                <strong>{f.originalName}</strong>
              </a>
              <button onClick={() => remove(f.id)}>excluir</button>
            </div>
            {f.contentType?.startsWith('image/') && f.contentType !== 'image/svg+xml' && (
              <img className="file-thumb" src={`/api/files/${f.id}`} alt={f.originalName} />
            )}
            <small>{formatSize(f.sizeBytes)} · {new Date(f.uploadedAt).toLocaleString('pt-BR')}</small>
            <code className="file-hash">SHA-256: {f.sha256}</code>
          </div>
        ))}
      </div>
    </div>
  )
}