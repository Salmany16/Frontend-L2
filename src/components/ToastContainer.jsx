import { useApp } from '../context/AppContext'

export default function ToastContainer() {
  const { toasts } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span>
            {toast.type === 'success' && '✅ '}
            {toast.type === 'error' && '❌ '}
            {toast.type === 'info' && 'ℹ️ '}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
