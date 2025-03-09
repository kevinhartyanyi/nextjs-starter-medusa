"use client"

import { createContext, useContext, useState } from "react"
import { HttpTypes } from "@medusajs/types"

type CompareContextType = {
  compareProducts: HttpTypes.StoreProduct[]
  addToCompare: (product: HttpTypes.StoreProduct) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState<HttpTypes.StoreProduct[]>([])

  const addToCompare = (product: HttpTypes.StoreProduct) => {
    if (compareProducts.length < 2 && !compareProducts.find(p => p.id === product.id)) {
      setCompareProducts([...compareProducts, product])
    }
  }

  const removeFromCompare = (productId: string) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId))
  }

  const clearCompare = () => {
    setCompareProducts([])
  }

  return (
    <CompareContext.Provider value={{ compareProducts, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => {
  const context = useContext(CompareContext)
  if (!context) throw new Error("useCompare must be used within CompareProvider")
  return context
}