'use client'

import { useState } from 'react'
import { ExternalLink, Edit, Trash2, Check, X, GripVertical } from 'lucide-react'
import { ShoppingItem, Priority } from '@/lib/shopping/types'
import { formatPrice } from '@/lib/shopping/price-extractor'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface ShoppingItemCardProps {
  item: ShoppingItem
  onToggleCompleted: (id: string) => void
  onEdit: (item: ShoppingItem) => void
  onDelete: (id: string) => void
  isSelected?: boolean
  onSelect?: (id: string, selected: boolean) => void
  isDragging?: boolean
}

const priorityStyles: Record<Priority, string> = {
  high: 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/80 to-white/80',
  medium: 'border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50/80 to-white/80',
  low: 'border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/80 to-white/80'
}

const priorityBadgeStyles: Record<Priority, string> = {
  high: 'bg-red-100/90 text-red-700 border-red-200/50',
  medium: 'bg-amber-100/90 text-amber-700 border-amber-200/50',
  low: 'bg-green-100/90 text-green-700 border-green-200/50'
}

export function ShoppingItemCard({
  item,
  onToggleCompleted,
  onEdit,
  onDelete,
  isSelected = false,
  onSelect,
  isDragging = false
}: ShoppingItemCardProps) {
  const [showActions, setShowActions] = useState(false)

  const handleUrlClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(item)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(item.id)
  }

  const handleToggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleCompleted(item.id)
  }

  const handleSelect = (checked: boolean) => {
    onSelect?.(item.id, checked)
  }

  return (
    <Card 
      className={`
        transition-all duration-300 hover:shadow-xl cursor-pointer backdrop-blur-sm border-0 shadow-lg hover:scale-[1.02]
        ${priorityStyles[item.priority]}
        ${item.completed ? 'opacity-60 scale-95' : ''}
        ${isDragging ? 'shadow-2xl scale-105 rotate-2' : ''}
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        rounded-xl overflow-hidden
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Selection checkbox */}
          {onSelect && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelect}
              className="mt-1.5 h-5 w-5"
            />
          )}

          {/* Drag handle */}
          <div className="cursor-grab text-gray-400 hover:text-gray-600 mt-1.5 transition-colors">
            <GripVertical className="w-5 h-5" />
          </div>

          {/* Completion checkbox */}
          <Checkbox
            checked={item.completed}
            onCheckedChange={() => onToggleCompleted(item.id)}
            className="mt-1.5 h-5 w-5"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className={`
                  text-lg font-semibold truncate mb-2
                  ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}
                `}>
                  {item.title}
                </h3>
                
                {item.price && (
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {formatPrice(item.price, item.currency)}
                  </p>
                )}

                {item.notes && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.notes}
                  </p>
                )}

                <div className="flex items-center mt-4 space-x-3">
                  <span className={`
                    inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border
                    ${priorityBadgeStyles[item.priority]}
                  `}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                  </span>

                  {item.category && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100/80 text-gray-700 border border-gray-200/50">
                      {item.category}
                    </span>
                  )}

                  <button
                    onClick={handleUrlClick}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100/80 text-blue-700 hover:bg-blue-200/80 transition-all duration-200 border border-blue-200/50"
                    title="Open product link"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Product
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className={`
                flex items-center space-x-2 ml-4
                transition-all duration-300 transform
                ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
              `}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="h-10 w-10 p-0 rounded-xl hover:bg-blue-100/80 transition-all duration-200"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-10 w-10 p-0 rounded-xl hover:bg-red-100/80 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}