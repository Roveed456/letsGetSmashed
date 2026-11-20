import { useCallback, useEffect, useMemo, useState } from 'react'
import { CartContext } from './useCart'

// cart state shared by all pages, saved in localStorage
// item: { key, id, title, highlight, image, sizeLabel, unitPrice, quantity }
// key = food + size, so Small and Large are separate lines

const STORAGE_KEY = 'smashed-cart'
const MAX_QUANTITY = 20

// load the saved cart
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  // save on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // saving is optional
    }
  }, [items])

  // add a line, or increase the quantity if it is already there
  const addItem = useCallback((newItem) => {
    setItems((current) => {
      const exists = current.some((item) => item.key === newItem.key)
      if (!exists) return [...current, newItem]
      return current.map((item) =>
        item.key === newItem.key
          ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + newItem.quantity) }
          : item,
      )
    })
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    const safeQuantity = Math.max(1, Math.min(MAX_QUANTITY, quantity))
    setItems((current) => current.map((item) => (item.key === key ? { ...item, quantity: safeQuantity } : item)))
  }, [])

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, addItem, updateQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
