import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'

const content = {
  en: {
    title: 'My Todo List',
    loading: 'Loading todos...',
    error: 'Failed to load todos. Please try again.',
    empty: 'No todos yet. Add one to get started!',
    completed: 'completed',
    active: 'active',
  },
  fr: {
    title: 'Ma liste de tâches',
    loading: 'Chargement des tâches...',
    error: 'Échec du chargement des tâches. Veuillez réessayer.',
    empty: 'Aucune tâche pour le moment. Ajoutez-en une pour commencer!',
    completed: 'terminée(s)',
    active: 'active(s)',
  },
}

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function TodoList({ lang = 'en' }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE}/api/todos`)
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (title) => {
    const response = await fetch(`${API_BASE}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    })
    if (!response.ok) throw new Error('Failed to add todo')
    const newTodo = await response.json()
    setTodos([...todos, newTodo])
  }

  const toggleTodo = async (id, completed) => {
    const response = await fetch(`${API_BASE}/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
    if (!response.ok) throw new Error('Failed to update todo')
    const updatedTodo = await response.json()
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
  }

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_BASE}/api/todos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete todo')
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  if (loading) {
    return <p>{content[lang].loading}</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{content[lang].error}</p>
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>{content[lang].title}</h2>

      <TodoForm onAdd={addTodo} lang={lang} />

      {todos.length > 0 && (
        <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
          {activeCount} {content[lang].active}, {completedCount}{' '}
          {content[lang].completed}
        </p>
      )}

      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: '1.1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          {content[lang].empty}
        </p>
      ) : (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  )
}
