import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine, Product } from '../types/product'
import { getProductById } from '../data/mockProducts'
import { CartContext, type CartContextValue } from './cartContext'

const STORAGE_KEY = 'shop_cart_v1'

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is CartLine =>
        x &&
        typeof x === 'object' &&
        typeof (x as CartLine).productId === 'number' &&
        typeof (x as CartLine).quantity === 'number' &&
        (x as CartLine).quantity > 0,
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadLines())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const add = useCallback((productId: number, quantity = 1) => {
    if (!getProductById(productId)) return
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId)
      if (idx === -1) return [...prev, { productId, quantity }]
      const next = [...prev]
      next[idx] = { productId, quantity: next[idx].quantity + quantity }
      return next
    })
  }, [])

  const setQty = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.productId !== productId))
      return
    }
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId)
      if (idx === -1) return [...prev, { productId, quantity }]
      const next = [...prev]
      next[idx] = { productId, quantity }
      return next
    })
  }, [])

  const remove = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    const linesDetailed = lines
      .map((line) => {
        const product = getProductById(line.productId)
        if (!product) return null
        return { ...line, product }
      })
      .filter((x): x is CartLine & { product: Product } => x !== null)

    const subtotal = linesDetailed.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
    const totalItems = linesDetailed.reduce((n, l) => n + l.quantity, 0)

    return { lines, add, setQty, remove, clear, totalItems, subtotal, linesDetailed }
  }, [lines, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
