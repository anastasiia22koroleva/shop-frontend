import { useMemo } from 'react'
import { mockProducts } from '../data/mockProducts'

export function useCategories() {
  return useMemo(() => {
    const set = new Set(mockProducts.map((p) => p.category))
    return ['Все', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'))]
  }, [])
}
