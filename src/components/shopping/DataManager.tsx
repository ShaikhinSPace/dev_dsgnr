'use client'

import { useState } from 'react'
import { Download, Upload, Database, Trash2, RotateCcw, HardDrive } from 'lucide-react'
import { StorageManager, StorageStats } from '@/lib/shopping/storage-manager'
import { formatPrice } from '@/lib/shopping/price-extractor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DataManagerProps {
  onDataChange?: () => void
  onToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void
}

export function DataManager({ onDataChange, onToast }: DataManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      // Load storage stats when dialog opens
      const stats = StorageManager.getStorageStats()
      setStorageStats(stats)
    }
  }

  const handleBackup = () => {
    try {
      StorageManager.downloadBackup()
      onToast('success', 'Backup downloaded successfully!')
    } catch (error) {
      onToast('error', 'Failed to create backup')
    }
  }

  const handleCreateBackup = () => {
    const success = StorageManager.createBackup()
    if (success) {
      onToast('success', 'Backup created successfully!')
    } else {
      onToast('error', 'Failed to create backup')
    }
  }

  const handleRestoreBackup = () => {
    const items = StorageManager.restoreFromBackup()
    if (items) {
      onToast('success', `Restored ${items.length} items from backup!`)
      onDataChange?.()
      setIsOpen(false)
    } else {
      onToast('error', 'No backup found to restore')
    }
  }

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      const result = await StorageManager.uploadAndImport(file)
      
      if (result.success) {
        onToast('success', result.message, `Imported ${result.itemCount} items`)
        onDataChange?.()
        setIsOpen(false)
      } else {
        onToast('error', 'Import failed', result.message)
      }
    } catch (error) {
      onToast('error', 'Import failed', 'An error occurred while importing data')
    } finally {
      setIsImporting(false)
      // Reset file input
      event.target.value = ''
    }
  }

  const handleClearData = () => {
    const success = StorageManager.clearAllData()
    if (success) {
      onToast('success', 'All data cleared successfully!')
      onDataChange?.()
      setIsOpen(false)
    } else {
      onToast('error', 'Failed to clear data')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl h-12 px-4">
          <Database className="w-4 h-4 mr-2" />
          Data Manager
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-xl p-0">
        <DialogHeader className="p-6 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management
          </DialogTitle>
          <DialogDescription>
            Backup, restore, import, and manage your shopping list data
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Storage Statistics */}
          {storageStats && (
            <Card className="bg-gray-50 border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Storage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Items:</span>
                    <span className="ml-2 font-medium">{storageStats.itemCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Value:</span>
                    <span className="ml-2 font-medium">{formatPrice(storageStats.totalValue)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Storage Size:</span>
                    <span className="ml-2 font-medium">{storageStats.storageSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="ml-2 font-medium">
                      {new Date(storageStats.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Backup & Export */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Backup & Export</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={handleBackup}
                className="flex items-center justify-center gap-2 h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4" />
                Download Backup
              </Button>
              
              <Button
                onClick={handleCreateBackup}
                variant="outline"
                className="flex items-center justify-center gap-2 h-12 border-gray-300"
              >
                <Database className="w-4 h-4" />
                Create Local Backup
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Download your data as a JSON file or create a local backup in browser storage.
            </p>
          </div>

          {/* Import & Restore */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Import & Restore</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="file-import" className="sr-only">Import file</Label>
                <Input
                  id="file-import"
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  disabled={isImporting}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('file-import')?.click()}
                  variant="outline"
                  disabled={isImporting}
                  className="flex items-center justify-center gap-2 h-12 w-full border-gray-300"
                >
                  <Upload className="w-4 h-4" />
                  {isImporting ? 'Importing...' : 'Import from File'}
                </Button>
              </div>
              
              <Button
                onClick={handleRestoreBackup}
                variant="outline"
                className="flex items-center justify-center gap-2 h-12 border-gray-300"
              >
                <RotateCcw className="w-4 h-4" />
                Restore Local Backup
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Import data from a JSON backup file or restore from your local backup.
            </p>
          </div>

          {/* Danger Zone */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-red-700">Danger Zone</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center justify-center gap-2 h-12"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your shopping list data
                    including items, history, and backups from your browser storage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearData}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Yes, clear all data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <p className="text-sm text-red-600">
              Permanently delete all shopping list data. This action cannot be undone.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-100 bg-gray-50">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}