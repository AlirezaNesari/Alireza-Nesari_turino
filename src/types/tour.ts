export type City = { id: string; name: string }

export type Tour = {
  id: string
  title: string
  origin: City
  destination: City
  startDate: string
  endDate: string
  price: number
  fleetVehicle: string
  availableSeats: number
  insurance: boolean
  options: string[]
  image: string
}

export type UserTour = Tour & { ended: boolean }
export type Transaction = { id: string; type: string; amount: number; createdAt: string }
export type OrderBody = { fullName: string; nationalCode: string; gender: string; birthDate: string }