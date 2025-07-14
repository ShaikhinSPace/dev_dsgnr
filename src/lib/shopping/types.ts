export type Priority = 'high' | 'medium' | 'low'

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD'

export interface ShoppingItem {
  id: string
  title: string
  url: string
  price?: number
  currency: Currency
  priority: Priority
  category?: string
  notes?: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  priceHistory?: PriceHistory[]
}

export interface PriceHistory {
  price: number
  extractedAt: Date
  source: string
}

export interface ShoppingList {
  id: string
  name: string
  items: ShoppingItem[]
  createdAt: Date
  updatedAt: Date
  totalEstimatedPrice?: number
}

export interface PriceExtractionResult {
  price?: number
  currency?: Currency
  title?: string
  success: boolean
  error?: string
  source: string
}

export interface FilterOptions {
  priority?: Priority[]
  completed?: boolean
  category?: string
  priceRange?: {
    min: number
    max: number
  }
}

export interface SortOptions {
  field: 'title' | 'price' | 'priority' | 'createdAt' | 'updatedAt'
  direction: 'asc' | 'desc'
}

export interface ExportFormat {
  type: 'json' | 'csv'
  includeCompleted: boolean
  includePriceHistory: boolean
}

export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}