'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Download, Trash2, MoreVertical } from 'lucide-react'
import { useShoppingList } from '@/hooks/shopping/useShoppingList'
import { useToast } from '@/hooks/shopping/useToast'
import { ShoppingItem, Priority } from '@/lib/shopping/types'
import { formatPrice } from '@/lib/shopping/price-extractor'
import { ShoppingItemCard } from './ShoppingItemCard'
import { AddEditItemForm } from './AddEditItemForm'
import { ToastContainer } from './ToastContainer'
import { DataManager } from './DataManager'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'

export function ShoppingList() {
  const {
    items,
    addItem,
    updateItem,
    deleteItem,
    deleteItems,
    toggleCompleted,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    totalEstimatedPrice,
    completedCount,
    pendingCount,
    priorityCounts,
    totalCount
  } = useShoppingList()

  const {
    toasts,
    removeToast,
    success,
    error,
    warning,
    info
  } = useToast()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ShoppingItem | undefined>()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const handleAddItem = (itemData: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    addItem(itemData)
    setIsFormOpen(false)
  }

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  const handleUpdateItem = (itemData: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      updateItem(editingItem.id, itemData)
      setEditingItem(undefined)
      setIsFormOpen(false)
    }
  }

  const handleDeleteItem = (id: string) => {
    deleteItem(id)
    success('Item deleted')
  }

  const handleBulkDelete = () => {
    if (selectedItems.size > 0) {
      deleteItems(Array.from(selectedItems))
      setSelectedItems(new Set())
      success(`${selectedItems.size} items deleted`)
    }
  }

  const handleSelectItem = (id: string, selected: boolean) => {
    const newSelection = new Set(selectedItems)
    if (selected) {
      newSelection.add(id)
    } else {
      newSelection.delete(id)
    }
    setSelectedItems(newSelection)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(items.map(item => item.id)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const handleExport = (format: 'json' | 'csv') => {
    try {
      let content: string
      let filename: string

      if (format === 'json') {
        content = JSON.stringify(items, null, 2)
        filename = `shopping-list-${new Date().toISOString().split('T')[0]}.json`
      } else {
        const headers = ['Title', 'URL', 'Price', 'Currency', 'Priority', 'Category', 'Notes', 'Completed']
        const rows = items.map(item => [
          item.title,
          item.url,
          item.price?.toString() || '',
          item.currency,
          item.priority,
          item.category || '',
          item.notes || '',
          item.completed.toString()
        ])
        content = [headers, ...rows].map(row => row.join(',')).join('\n')
        filename = `shopping-list-${new Date().toISOString().split('T')[0]}.csv`
      }

      const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)

      success(`Exported as ${format.toUpperCase()}`)
    } catch (err) {
      error('Export failed')
    }
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingItem(undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Shopping List
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Smart shopping with automatic price tracking</p>
            </div>
            <Button 
              onClick={() => setIsFormOpen(true)} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{totalCount}</div>
                <div className="text-xs text-gray-500 mt-1">All shopping items</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500">{pendingCount}</div>
                <div className="text-xs text-gray-500 mt-1">Items to buy</div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{completedCount}</div>
                <div className="text-xs text-gray-500 mt-1">Items bought</div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Estimated Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {formatPrice(totalEstimatedPrice)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Pending items</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search your shopping items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/70 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-200 rounded-xl text-lg"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl h-12 px-4"
              >
                <Filter className="w-4 h-4 mr-2" />
                <span>Filters</span>
              </Button>

              <Select
                value={`${sortBy.field}-${sortBy.direction}`}
                onValueChange={(value) => {
                  const [field, direction] = value.split('-')
                  setSortBy({ field: field as any, direction: direction as 'asc' | 'desc' })
                }}
              >
                <SelectTrigger className="w-48 h-12 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                  <SelectItem value="price-desc">Price High-Low</SelectItem>
                  <SelectItem value="price-asc">Price Low-High</SelectItem>
                  <SelectItem value="priority-desc">Priority High-Low</SelectItem>
                </SelectContent>
              </Select>

              <DataManager 
                onDataChange={() => window.location.reload()} 
                onToast={(type, title, message) => {
                  if (type === 'success') success(title, message)
                  else if (type === 'error') error(title, message)
                  else info(title, message)
                }}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl h-12 px-4">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleExport('json')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleBulkDelete}
                    disabled={selectedItems.size === 0}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected ({selectedItems.size})
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <Select
                      value={filters.priority?.[0] || 'all'}
                      onValueChange={(value) => {
                        if (value === 'all') {
                          setFilters({ ...filters, priority: undefined })
                        } else {
                          setFilters({ ...filters, priority: [value as Priority] })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select
                      value={filters.completed === undefined ? 'all' : filters.completed.toString()}
                      onValueChange={(value) => {
                        if (value === 'all') {
                          setFilters({ ...filters, completed: undefined })
                        } else {
                          setFilters({ ...filters, completed: value === 'true' })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        <SelectItem value="false">Pending</SelectItem>
                        <SelectItem value="true">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      placeholder="Filter by category"
                      value={filters.category || ''}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bulk Actions */}
          {selectedItems.size > 0 && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedItems.size === items.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedItems.size} of {items.length} items selected
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected</span>
              </Button>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-6">
          {items.length === 0 ? (
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Plus className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Your shopping list is empty</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">Start building your smart shopping list by adding your first item with automatic price detection.</p>
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Item
                </Button>
              </CardContent>
            </Card>
          ) : (
            items.map((item) => (
              <ShoppingItemCard
                key={item.id}
                item={item}
                onToggleCompleted={toggleCompleted}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                isSelected={selectedItems.has(item.id)}
                onSelect={handleSelectItem}
              />
            ))
          )}
        </div>

        {/* Add/Edit Form */}
        <AddEditItemForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={editingItem ? handleUpdateItem : handleAddItem}
          item={editingItem}
          onToast={(type, title, message) => {
            if (type === 'success') success(title, message)
            else if (type === 'error') error(title, message)
            else if (type === 'warning') warning(title, message)
            else info(title, message)
          }}
        />

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    </div>
  )
}