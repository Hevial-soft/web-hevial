import { useState } from 'react'
import type { User, Subscription, Order } from '../types'

const DEMO_ORDERS: Order[] = [
  {
    id: '1',
    number: '#0042',
    description: 'Корпус для электроники · PLA · 3 шт.',
    date: '12 мая 2025',
    status: 'done',
    price: 2400,
  },
  {
    id: '2',
    number: '#0051',
    description: 'Кронштейн крепления · PETG · 1 шт.',
    date: '28 апреля 2025',
    status: 'done',
    price: 850,
  },
]

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [orders] = useState<Order[]>(DEMO_ORDERS)

  const login = (u: User) => setUser(u)
  const logout = () => {
    setUser(null)
    setSubscription(null)
  }

  return { user, subscription, orders, login, logout, setSubscription }
}
