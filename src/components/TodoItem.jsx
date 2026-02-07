import { GcdsButton } from '@cdssnc/gcds-components-react'

const content = {
  en: {
    delete: 'Delete',
  },
  fr: {
    delete: 'Supprimer',
  },
}

export default function TodoItem({ todo, onToggle, onDelete, lang = 'en' }) {
  const handleToggle = async () => {
    try {
      await onToggle(todo.id, !todo.completed)
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await onDelete(todo.id)
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggle}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#666' : '#000',
            cursor: 'pointer',
          }}
        >
          {todo.title}
        </label>
      </div>
      <GcdsButton
        buttonRole="danger"
        size="small"
        onClick={handleDelete}
      >
        {content[lang].delete}
      </GcdsButton>
    </div>
  )
}
