import type { Product } from '../types/product'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Oracle Red Bull Racing RB20',
    shortDescription: 'Сезон 2024 · гибрид V6 + MGU-K/H',
    description:
      'Шасси и аэрокомплект в спецификации Гран-при: карбон-монокок, передняя и задняя подвеска на тягах, диффузор и боковые понтоны. Для витрины: без силовой установки и электроники FIA.',
    price: 420,
    category: 'Топ-команды',
    image: '/bolides/1.svg',
  },
  {
    id: 2,
    name: 'Scuderia Ferrari SF-24',
    shortDescription: 'Сезон 2024 · нос с антисквизом',
    description:
      'Инженерная скульптура кузова сезона 2024: S-канал, задняя балка, оптимизированные дефлекторы. Поставляется как статический экспонат; не для трека.',
    price: 398,
    category: 'Топ-команды',
    image: '/bolides/2.svg',
  },
  {
    id: 3,
    name: 'Mercedes-AMG F1 W15 E Performance',
    shortDescription: 'Сезон 2024 · нулевые боковые понтоны',
    description:
      'Серебристая стрела Брэкли: антисквиз-профиль, удлинённая колёсная база визуально, детализированные тормозные каналы. Мок-лот: без PU.',
    price: 365,
    category: 'Топ-команды',
    image: '/bolides/3.svg',
  },
  {
    id: 4,
    name: 'McLaren MCL38',
    shortDescription: 'Сезон 2024 · papaya / anthracite',
    description:
      'Фирменная палитра McLaren, переднее крыло с каскадом стойок, минималистичная зона кокпита. Идеально для коллекции и съёмки — не для заездов.',
    price: 312,
    category: 'Топ-команды',
    image: '/bolides/4.svg',
  },
  {
    id: 5,
    name: 'Aston Martin Aramco F1 AMR24',
    shortDescription: 'Сезон 2024 · британский зелёный',
    description:
      'Приземистый нос, широкие понтоны и аккуратная зона заднего крыла. В моке: визуальная копия ливреи сезона, без гибридной системы.',
    price: 185,
    category: 'Мидфилд',
    image: '/bolides/5.svg',
  },
  {
    id: 6,
    name: 'BWT Alpine F1 A524',
    shortDescription: 'Сезон 2024 · pink / carbon',
    description:
      'Боковые дефлекторы и удлинённая зона днища. Лаконичный силуэт Энстоуна. Только для интерьера гаража или музея — как и весь каталог.',
    price: 148,
    category: 'Мидфилд',
    image: '/bolides/6.svg',
  },
  {
    id: 7,
    name: 'Williams Racing FW46',
    shortDescription: 'Сезон 2024 · sapphire blue',
    description:
      'Узкая передняя часть и чистая линия крыла. Команда из Гроува — в миниатюре истории Ф1 на кузове. Статический лот.',
    price: 92,
    category: 'Мидфилд',
    image: '/bolides/7.svg',
  },
  {
    id: 8,
    name: 'Oracle Red Bull Racing RB19 · шоу-кар',
    shortDescription: 'Демо-обвес · без FOM телеметрии',
    description:
      'Дорожная скорость, мягкие шины для парадов и автосалонов. Самый доступный вход в эстетику болидов — при этом всё ещё серьёзный силуэт чемпионской машины.',
    price: 28.5,
    category: 'Шоу-кар',
    image: '/bolides/8.svg',
  },
]

export function getProductById(id: number): Product | undefined {
  return mockProducts.find((p) => p.id === id)
}
