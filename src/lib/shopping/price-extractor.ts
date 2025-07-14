import { PriceExtractionResult, Currency } from './types'

const CURRENCY_SYMBOLS: Record<string, Currency> = {
  '$': 'USD',
  '€': 'EUR',
  '£': 'GBP',
  '₹': 'INR',
  'CAD': 'CAD',
  'USD': 'USD',
  'EUR': 'EUR',
  'GBP': 'GBP',
  'INR': 'INR'
}

const PRICE_PATTERNS = [
  // $123.45, $123, $1,234.56
  /[\$][\d,]+\.?\d*/g,
  // €123.45, €123, €1,234.56
  /[€][\d,]+\.?\d*/g,
  // £123.45, £123, £1,234.56
  /[£][\d,]+\.?\d*/g,
  // ₹123.45, ₹123, ₹1,234.56
  /[₹][\d,]+\.?\d*/g,
  // 123.45 USD, 123 EUR, etc.
  /[\d,]+\.?\d*\s*(USD|EUR|GBP|INR|CAD)/gi,
  // Generic number patterns (fallback)
  /[\d,]+\.?\d*/g
]

const SITE_SELECTORS: Record<string, string[]> = {
  'amazon.com': [
    '.a-price-whole',
    '.a-price.a-text-price.a-size-medium.apexPriceToPay',
    '.a-price-amount',
    '#price_inside_buybox',
    '.a-price .a-offscreen'
  ],
  'ebay.com': [
    '.u-flL.condText',
    '.notranslate',
    '#mm-saleDscPrc',
    '#prcIsum'
  ],
  'walmart.com': [
    '[data-automation-id="product-price"]',
    '.price-current',
    '.price-group .price-current'
  ],
  'target.com': [
    '[data-test="product-price"]',
    '.Price-module__container'
  ]
}

export class PriceExtractor {
  private static extractFromText(text: string): PriceExtractionResult {
    try {
      for (const pattern of PRICE_PATTERNS) {
        const matches = text.match(pattern)
        if (matches && matches.length > 0) {
          const match = matches[0]
          const priceStr = match.replace(/[^\d.,]/g, '').replace(/,/g, '')
          const price = parseFloat(priceStr)
          
          if (!isNaN(price) && price > 0) {
            // Detect currency
            let currency: Currency = 'USD' // default
            for (const [symbol, curr] of Object.entries(CURRENCY_SYMBOLS)) {
              if (match.includes(symbol) || text.toLowerCase().includes(symbol.toLowerCase())) {
                currency = curr
                break
              }
            }
            
            return {
              price,
              currency,
              success: true,
              source: 'text-extraction'
            }
          }
        }
      }
      
      return {
        success: false,
        error: 'No valid price found in text',
        source: 'text-extraction'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'text-extraction'
      }
    }
  }

  private static async extractFromHTML(html: string, url: string): Promise<PriceExtractionResult> {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const hostname = new URL(url).hostname.toLowerCase()
      
      // Try site-specific selectors first
      for (const [site, selectors] of Object.entries(SITE_SELECTORS)) {
        if (hostname.includes(site)) {
          for (const selector of selectors) {
            const element = doc.querySelector(selector)
            if (element?.textContent) {
              const result = this.extractFromText(element.textContent)
              if (result.success) {
                result.source = `${site}-selector`
                return result
              }
            }
          }
        }
      }
      
      // Fallback: search common price selectors
      const commonSelectors = [
        '[class*="price"]',
        '[id*="price"]',
        '[data-testid*="price"]',
        '.price',
        '#price',
        '.cost',
        '.amount',
        '[class*="cost"]',
        '[class*="amount"]'
      ]
      
      for (const selector of commonSelectors) {
        const elements = doc.querySelectorAll(selector)
        for (const element of elements) {
          if (element.textContent) {
            const result = this.extractFromText(element.textContent)
            if (result.success) {
              result.source = 'common-selector'
              return result
            }
          }
        }
      }
      
      // Last resort: search entire page text
      const result = this.extractFromText(doc.body?.textContent || '')
      if (result.success) {
        result.source = 'full-page-text'
        return result
      }
      
      return {
        success: false,
        error: 'No price found on page',
        source: 'html-extraction'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HTML parsing error',
        source: 'html-extraction'
      }
    }
  }

  static async extractPrice(url: string): Promise<PriceExtractionResult> {
    try {
      // Validate URL
      new URL(url)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Enhanced mock implementation with realistic price extraction
      const urlLower = url.toLowerCase()
      
      // Check for URL parameters first
      if (urlLower.includes('price=') || urlLower.includes('cost=')) {
        const match = url.match(/(?:price|cost)=([0-9.]+)/i)
        if (match) {
          return {
            price: parseFloat(match[1]),
            currency: 'USD',
            success: true,
            source: 'url-parameter'
          }
        }
      }
      
      // Simulate different extraction scenarios based on domain
      let mockPrice: number | undefined
      let currency: Currency = 'USD'
      
      if (urlLower.includes('amazon')) {
        mockPrice = Math.floor(Math.random() * 500) + 10 // $10-$510
        currency = 'USD'
      } else if (urlLower.includes('ebay')) {
        mockPrice = Math.floor(Math.random() * 200) + 5 // $5-$205
        currency = 'USD'
      } else if (urlLower.includes('walmart') || urlLower.includes('target')) {
        mockPrice = Math.floor(Math.random() * 150) + 15 // $15-$165
        currency = 'USD'
      } else if (urlLower.includes('flipkart') || urlLower.includes('myntra')) {
        mockPrice = Math.floor(Math.random() * 5000) + 100 // ₹100-₹5100
        currency = 'INR'
      } else if (urlLower.includes('.co.uk')) {
        mockPrice = Math.floor(Math.random() * 300) + 10 // £10-£310
        currency = 'GBP'
      } else if (urlLower.includes('.de') || urlLower.includes('.fr')) {
        mockPrice = Math.floor(Math.random() * 400) + 15 // €15-€415
        currency = 'EUR'
      } else {
        // Generic e-commerce site simulation
        mockPrice = Math.floor(Math.random() * 250) + 20 // $20-$270
      }
      
      if (mockPrice) {
        // Add some cents for realism
        mockPrice += Math.floor(Math.random() * 99) / 100
        
        return {
          price: mockPrice,
          currency,
          success: true,
          source: 'mock-extraction'
        }
      }
      
      return {
        success: false,
        error: 'Could not extract price from this URL. Please enter manually.',
        source: 'extraction-failed'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid URL',
        source: 'url-validation'
      }
    }
  }

  static extractPriceFromText = this.extractFromText
  static extractPriceFromHTML = this.extractFromHTML
}

export const formatPrice = (price: number, currency: Currency = 'USD'): string => {
  const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'CAD$'
  }
  
  const symbol = currencySymbols[currency]
  return `${symbol}${price.toFixed(2)}`
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}