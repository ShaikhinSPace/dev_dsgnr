'use client'

import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'
import { ToastNotification } from '@/lib/shopping/types'

interface ToastContainerProps {
  toasts: ToastNotification[]
  onRemoveToast: (id: string) => void
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type]
        return (
          <div
            key={toast.id}
            className={`
              max-w-sm w-full border rounded-lg p-4 shadow-lg
              transform transition-all duration-300 ease-in-out
              animate-in slide-in-from-right-full
              ${toastStyles[toast.type]}
            `}
          >
            <div className="flex items-start">
              <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => onRemoveToast(toast.id)}
                className="ml-3 flex-shrink-0 rounded-md p-1.5 hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}