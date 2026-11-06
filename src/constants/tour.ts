import { Bus, Car, Plane, Ship, TrainFront } from 'lucide-react'

export const VEHICLES = {
  bus: { label: 'اتوبوس', icon: Bus },
  ship: { label: 'کشتی', icon: Ship },
  train: { label: 'قطار', icon: TrainFront },
  airplane: { label: 'هواپیما', icon: Plane },
  suv: { label: 'خودرو شاسی‌بلند', icon: Car },
} as const

export const getVehicle = (v: string) =>
  VEHICLES[v.toLowerCase() as keyof typeof VEHICLES] ?? { label: v, icon: Car }


export const CITY_NAMES: Record<string, string> = {
  '1': 'تهران',
  '2': 'سنندج',
  '3': 'مادرید',
  '4': 'اصفهان',
  '5': 'سلیمانیه',
  '6': 'هولر',
  '7': 'مازندران',
  '8': 'گیلان',
  '9': 'ایتالیا',
}
const list = (ids: string[]) => ids.map((id) => ({ id, name: CITY_NAMES[id] }))
export const ORIGINS = list(['1', '2', '4'])
export const DESTINATIONS = list(['2', '3', '5', '6', '7', '8', '9'])
export const cityName = (c: { id: string; name: string }) => CITY_NAMES[c.id] ?? c.name