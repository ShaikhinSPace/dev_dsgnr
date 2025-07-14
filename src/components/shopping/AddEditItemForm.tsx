'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, DollarSign } from 'lucide-react'
import { ShoppingItem, Priority, Currency } from '@/lib/shopping/types'
import { PriceExtractor, validateUrl } from '@/lib/shopping/price-extractor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  url: z.string().min(1, 'URL is required').refine(validateUrl, 'Invalid URL'),
  price: z.number().min(0, 'Price must be positive').optional(),
  currency: z.enum(['USD', 'EUR', 'GBP', 'INR', 'CAD']),
  priority: z.enum(['high', 'medium', 'low']),
  category: z.string().max(50, 'Category too long').optional(),
  notes: z.string().max(500, 'Notes too long').optional(),
})

type FormData = z.infer<typeof formSchema>

interface AddEditItemFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  item?: ShoppingItem
  onToast: (type: 'success' | 'error', title: string, message?: string) => void
}

export function AddEditItemForm({
  isOpen,
  onClose,
  onSubmit,
  item,
  onToast
}: AddEditItemFormProps) {
  const [isExtracting, setIsExtracting] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
      price: undefined,
      currency: 'USD',
      priority: 'medium',
      category: '',
      notes: ''
    }
  })

  const watchedUrl = watch('url')

  useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        url: item.url,
        price: item.price,
        currency: item.currency,
        priority: item.priority,
        category: item.category || '',
        notes: item.notes || ''
      })
    } else {
      reset({
        title: '',
        url: '',
        price: undefined,
        currency: 'USD',
        priority: 'medium',
        category: '',
        notes: ''
      })
    }
  }, [item, reset])

  const extractPrice = async () => {
    if (!watchedUrl || !validateUrl(watchedUrl)) {
      onToast('error', 'Invalid URL', 'Please enter a valid URL first')
      return
    }

    setIsExtracting(true)
    try {
      const result = await PriceExtractor.extractPrice(watchedUrl)
      
      if (result.success) {
        setValue('price', result.price)
        if (result.currency) {
          setValue('currency', result.currency)
        }
        if (result.title && !watch('title')) {
          setValue('title', result.title)
        }
        onToast('success', 'Price extracted successfully!')
      } else {
        onToast('error', 'Price extraction failed', result.error || 'Could not extract price from this URL')
      }
    } catch (error) {
      onToast('error', 'Extraction error', 'An error occurred while extracting price')
    } finally {
      setIsExtracting(false)
    }
  }

  const onFormSubmit = async (data: FormData) => {
    try {
      const itemData: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'> = {
        title: data.title.trim(),
        url: data.url.trim(),
        price: data.price,
        currency: data.currency,
        priority: data.priority,
        category: data.category?.trim() || undefined,
        notes: data.notes?.trim() || undefined,
        completed: item?.completed || false,
        priceHistory: item?.priceHistory || []
      }

      onSubmit(itemData)
      onToast('success', item ? 'Item updated' : 'Item added successfully')
      onClose()
    } catch (error) {
      onToast('error', 'Failed to save item', 'Please try again')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-xl p-0">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900 mb-1">
            {item ? 'Edit Shopping Item' : 'Add New Shopping Item'}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {item ? 'Update your shopping item details' : 'Add a new item with automatic price detection'}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Product Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter the product name"
                {...register('title')}
                className="h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                Product URL *
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://amazon.com/product"
                {...register('url')}
                className="h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.url && (
                <p className="text-sm text-red-600">{errors.url.message}</p>
              )}
            </div>

            {/* Price and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price (Optional)
                </Label>
                <div className="flex">
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register('price', { valueAsNumber: true })}
                    className="h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-r-none border-r-0"
                  />
                  <Button
                    type="button"
                    onClick={extractPrice}
                    disabled={isExtracting || !watchedUrl}
                    className="h-10 rounded-l-none bg-blue-600 hover:bg-blue-700 text-white px-3"
                  >
                    {isExtracting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <DollarSign className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.price && (
                  <p className="text-sm text-red-600">{errors.price.message}</p>
                )}
                {isExtracting && (
                  <p className="text-sm text-blue-600">Extracting price...</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                  Currency
                </Label>
                <Select
                  value={watch('currency')}
                  onValueChange={(value: Currency) => setValue('currency', value)}
                >
                  <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority
                </Label>
                <Select
                  value={watch('priority')}
                  onValueChange={(value: Priority) => setValue('priority', value)}
                >
                  <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category
                </Label>
                <Input
                  id="category"
                  placeholder="e.g., Electronics"
                  {...register('category')}
                  className="h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.category && (
                  <p className="text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional notes or comments"
                rows={3}
                {...register('notes')}
                className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
              {errors.notes && (
                <p className="text-sm text-red-600">{errors.notes.message}</p>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onFormSubmit)}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                item ? 'Update Item' : 'Add Item'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}