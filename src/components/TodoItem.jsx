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
    <div className="todo-item">
      <div className="todo-item-content">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-item-checkbox"
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={todo.completed ? 'todo-item-label-completed' : 'todo-item-label'}
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
