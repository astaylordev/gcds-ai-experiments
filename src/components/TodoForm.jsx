import { useState } from 'react'
import { GcdsInput, GcdsButton } from '@cdssnc/gcds-components-react'

const content = {
  en: {
    label: 'New todo',
    placeholder: 'Enter a new todo...',
    addButton: 'Add Todo',
  },
  fr: {
    label: 'Nouvelle tâche',
    placeholder: 'Entrez une nouvelle tâche...',
    addButton: 'Ajouter une tâche',
  },
}

export default function TodoForm({ onAdd, lang = 'en' }) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onAdd(title.trim())
      setTitle('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div>
        <label htmlFor="todo-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          {content[lang].label}
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <GcdsInput
              inputId="todo-input"
              name="todo"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              placeholder={content[lang].placeholder}
              required
              hideLabel
            />
          </div>
          <GcdsButton type="submit" disabled={isSubmitting || !title.trim()}>
            {content[lang].addButton}
          </GcdsButton>
        </div>
      </div>
    </form>
  )
}
