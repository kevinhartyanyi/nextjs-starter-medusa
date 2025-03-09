'use client'

import { HttpTypes } from "@medusajs/types"
import { useCompare } from "@lib/context/compare-context"

type CompareButtonProps = {
  product: HttpTypes.StoreProduct
}

const CompareButton: React.FC<CompareButtonProps> = ({ product }) => {
  const { compareProducts, addToCompare, removeFromCompare } = useCompare()
  const isInCompare = compareProducts.some(p => p.id === product.id)
  const isCompareFull = compareProducts.length >= 2 && !isInCompare

  return (
    <button
      disabled={isCompareFull}
      className={`text-small-regular border px-4 py-2 rounded-full ${
        isInCompare 
          ? "bg-gray-900 text-white" 
          : isCompareFull 
            ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
            : "bg-white text-gray-900"
      }`}
      onClick={() => {
        if (isInCompare) {
          removeFromCompare(product.id)
        } else {
          addToCompare(product)
        }
      }}
    >
      {isInCompare ? "Remove from Compare" : "Compare"}
    </button>
  )
}

export default CompareButton