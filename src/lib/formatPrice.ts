/** Цена в моке: миллионы рублей (условная единица). */
export function formatMlnRub(millions: number): string {
  const digits = millions.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(millions) ? 0 : 1,
    maximumFractionDigits: 1,
  })
  return `${digits} млн ₽`
}
