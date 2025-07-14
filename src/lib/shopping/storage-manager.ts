import { ShoppingItem } from './types'

export interface StorageData {
  items: ShoppingItem[]
  exportedAt: string
  version: string
}

export interface StorageStats {
  itemCount: number
  totalValue: number
  storageSize: string
  lastUpdated: string
}

export class StorageManager {
  private static readonly STORAGE_KEY = 'shopping-list-items'
  private static readonly BACKUP_KEY = 'shopping-list-backup'
  private static readonly VERSION = '1.0.0'

  // Get all items from storage
  static getItems(): ShoppingItem[] {
    try {
      if (typeof window === 'undefined') return []
      
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []
      
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to load items from storage:', error)
      return []
    }
  }

  // Save items to storage
  static saveItems(items: ShoppingItem[]): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items))
      return true
    } catch (error) {
      console.error('Failed to save items to storage:', error)
      return false
    }
  }

  // Create a backup of current data
  static createBackup(): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      const items = this.getItems()
      const backup: StorageData = {
        items,
        exportedAt: new Date().toISOString(),
        version: this.VERSION
      }
      
      localStorage.setItem(this.BACKUP_KEY, JSON.stringify(backup))
      return true
    } catch (error) {
      console.error('Failed to create backup:', error)
      return false
    }
  }

  // Restore from backup
  static restoreFromBackup(): ShoppingItem[] | null {
    try {
      if (typeof window === 'undefined') return null
      
      const backup = localStorage.getItem(this.BACKUP_KEY)
      if (!backup) return null
      
      const parsed: StorageData = JSON.parse(backup)
      
      // Save restored items
      this.saveItems(parsed.items)
      
      return parsed.items
    } catch (error) {
      console.error('Failed to restore from backup:', error)
      return null
    }
  }

  // Export data as JSON
  static exportData(): string {
    const items = this.getItems()
    const exportData: StorageData = {
      items,
      exportedAt: new Date().toISOString(),
      version: this.VERSION
    }
    
    return JSON.stringify(exportData, null, 2)
  }

  // Import data from JSON
  static importData(jsonData: string): { success: boolean; message: string; itemCount?: number } {
    try {
      const parsed = JSON.parse(jsonData)
      
      // Validate structure
      if (!parsed.items || !Array.isArray(parsed.items)) {
        return { success: false, message: 'Invalid data format: missing items array' }
      }
      
      // Validate items structure
      for (const item of parsed.items) {
        if (!item.id || !item.title || !item.url) {
          return { success: false, message: 'Invalid item structure: missing required fields' }
        }
      }
      
      // Save imported items
      const success = this.saveItems(parsed.items)
      
      if (success) {
        return { 
          success: true, 
          message: 'Data imported successfully!', 
          itemCount: parsed.items.length 
        }
      } else {
        return { success: false, message: 'Failed to save imported data' }
      }
    } catch (error) {
      return { success: false, message: 'Invalid JSON format' }
    }
  }

  // Get storage statistics
  static getStorageStats(): StorageStats {
    const items = this.getItems()
    const itemCount = items.length
    const totalValue = items
      .filter(item => !item.completed && item.price)
      .reduce((sum, item) => sum + (item.price || 0), 0)
    
    // Calculate storage size
    let storageSize = '0 KB'
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(this.STORAGE_KEY) || ''
        const sizeInBytes = new Blob([stored]).size
        if (sizeInBytes < 1024) {
          storageSize = `${sizeInBytes} B`
        } else if (sizeInBytes < 1024 * 1024) {
          storageSize = `${(sizeInBytes / 1024).toFixed(1)} KB`
        } else {
          storageSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
        }
      }
    } catch (error) {
      console.error('Failed to calculate storage size:', error)
    }
    
    const lastUpdated = items.length > 0 
      ? new Date(Math.max(...items.map(item => new Date(item.updatedAt).getTime()))).toISOString()
      : new Date().toISOString()
    
    return {
      itemCount,
      totalValue,
      storageSize,
      lastUpdated
    }
  }

  // Clear all data
  static clearAllData(): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      localStorage.removeItem(this.STORAGE_KEY)
      localStorage.removeItem(this.BACKUP_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear data:', error)
      return false
    }
  }

  // Download data as file
  static downloadBackup(filename?: string): void {
    try {
      const data = this.exportData()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename || `shopping-list-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download backup:', error)
    }
  }

  // Upload and import file
  static uploadAndImport(file: File): Promise<{ success: boolean; message: string; itemCount?: number }> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const result = this.importData(content)
          resolve(result)
        } catch (error) {
          resolve({ success: false, message: 'Failed to read file' })
        }
      }
      
      reader.onerror = () => {
        resolve({ success: false, message: 'Failed to read file' })
      }
      
      reader.readAsText(file)
    })
  }
}