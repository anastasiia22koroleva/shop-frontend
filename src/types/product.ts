export type Product = {
  id: number
  name: string
  shortDescription: string
  description: string
  /** Условная цена, млн ₽ */
  price: number
  category: string
  image: string
}

export type CartLine = {
  productId: number
  quantity: number
}
