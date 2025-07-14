'use client'

import { useState, useCallback, useMemo } from 'react'
import { ShoppingItem, Priority, FilterOptions, SortOptions } from '@/lib/shopping/types'
import { useLocalStorage } from './useLocalStorage'

// Simple UUID generator fallback
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function useShoppingList() {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping-list-items', [])
  const [filters, setFilters] = useState<FilterOptions>({})
  const [sortBy, setSortBy] = useState<SortOptions>({ field: 'createdAt', direction: 'desc' })
  const [searchQuery, setSearchQuery] = useState('')

  const addItem = useCallback((item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: ShoppingItem = {
      ...item,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setItems(prev => [...prev, newItem])
    return newItem
  }, [setItems])

  const updateItem = useCallback((id: string, updates: Partial<ShoppingItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ))
  }, [setItems])

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [setItems])

  const deleteItems = useCallback((ids: string[]) => {
    setItems(prev => prev.filter(item => !ids.includes(item.id)))
  }, [setItems])

  const toggleCompleted = useCallback((id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed, updatedAt: new Date() }
        : item
    ))
  }, [setItems])

  const reorderItems = useCallback((startIndex: number, endIndex: number) => {
    setItems(prev => {
      const result = Array.from(prev)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result.map((item, index) => ({ ...item, updatedAt: new Date() }))
    })
  }, [setItems])

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!item.title.toLowerCase().includes(query) && 
            !item.url.toLowerCase().includes(query) &&
            !item.notes?.toLowerCase().includes(query)) {
          return false
        }
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(item.priority)) {
          return false
        }
      }

      // Completed filter
      if (filters.completed !== undefined) {
        if (item.completed !== filters.completed) {
          return false
        }
      }

      // Category filter
      if (filters.category) {
        if (item.category !== filters.category) {
          return false
        }
      }

      // Price range filter
      if (filters.priceRange && item.price) {
        if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
          return false
        }
      }

      return true
    })

    // Sort items
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy.field) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'price':
          aValue = a.price || 0
          bValue = b.price || 0
          break
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case 'updatedAt':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        default:
          return 0
      }

      if (sortBy.direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return filtered
  }, [items, searchQuery, filters, sortBy])

  const totalEstimatedPrice = useMemo(() => {
    return items
      .filter(item => !item.completed && item.price)
      .reduce((total, item) => total + (item.price || 0), 0)
  }, [items])

  const completedCount = useMemo(() => {
    return items.filter(item => item.completed).length
  }, [items])

  const pendingCount = useMemo(() => {
    return items.filter(item => !item.completed).length
  }, [items])

  const priorityCounts = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!item.completed) {
        acc[item.priority] = (acc[item.priority] || 0) + 1
      }
      return acc
    }, {} as Record<Priority, number>)
  }, [items])

  return {
    // Data
    items: filteredAndSortedItems,
    allItems: items,
    
    // Actions
    addItem,
    updateItem,
    deleteItem,
    deleteItems,
    toggleCompleted,
    reorderItems,
    
    // Filters and Search
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    
    // Statistics
    totalEstimatedPrice,
    completedCount,
    pendingCount,
    priorityCounts,
    totalCount: items.length
  }
}