import { createContext } from 'react'
import type { CartLine, Product } from '../types/product'

export type CartContextValue = {
  lines: CartLine[]
  add: (productId: number, quantity?: number) => void
  setQty: (productId: number, quantity: number) => void
  remove: (productId: number) => void
  clear: () => void
  totalItems: number
  subtotal: number
  linesDetailed: Array<CartLine & { product: Product }>
}

export const CartContext = createContext<CartContextValue | null>(null)
