import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const add = (item) => setItems((s) => {
    const found = s.find((i) => i.id === item.id)
    if (found) return s.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
    return [...s, { ...item, qty: 1 }]
  })
  const remove = (id) => setItems((s) => s.filter((i) => i.id !== id))
  const updateQty = (id, qty) => setItems((s) => s.map((i) => (i.id === id ? { ...i, qty } : i)))
  const clear = () => setItems([])

  const total = items.reduce((sum, it) => sum + it.qty * (it.price || 0), 0)

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
