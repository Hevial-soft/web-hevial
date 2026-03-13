export type SubLevel = 'base' | 'pro'

export interface Subscription {
  level: SubLevel
  expiry: string // ISO date string e.g. '2025-06-15'
}

export interface User {
  name: string
  telegramId?: string
}

export type OrderStatus = 'active' | 'done' | 'pending'

export interface Order {
  id: string
  number: string
  description: string
  date: string
  status: OrderStatus
  price: number
}

export interface AuthContextType {
  user: User | null
  subscription: Subscription | null
  orders: Order[]
  login: (user: User) => void
  logout: () => void
  setSubscription: (sub: Subscription | null) => void
}
