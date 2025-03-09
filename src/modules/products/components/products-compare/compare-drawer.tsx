'use client'

import { useCompare } from "@lib/context/compare-context"
import { XMark, ChevronUpMini } from "@medusajs/icons"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const CompareDrawer = () => {
  const { compareProducts, removeFromCompare, clearCompare } = useCompare()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (compareProducts.length === 0) return null

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 ${
        isCollapsed ? 'h-16' : 'p-4'
      }`}
    >
      <div className="content-container">
        {isCollapsed ? (
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              <span className="text-small-regular">Comparing {compareProducts.length} products</span>
              <div className="flex -space-x-3">
                {compareProducts.map((product) => (
                  <div key={product.id} className="w-8 h-8 relative rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={product.thumbnail || ""}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {compareProducts.length === 2 && (
                <Link
                  href={`/products/compare/${compareProducts[0].handle}/${compareProducts[1].handle}`}
                  className="text-small-regular bg-gray-900 text-white px-4 py-1 rounded-full"
                >
                  Compare
                </Link>
              )}
              <button 
                onClick={() => setIsCollapsed(false)}
                className="p-2"
              >
                <ChevronUpMini />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-large-semi">Compare Products ({compareProducts.length}/2)</h3>
              <div className="flex items-center gap-2">
                <button onClick={clearCompare}>
                  <XMark />
                </button>
                <button 
                  onClick={() => setIsCollapsed(true)}
                  className="p-2"
                >
                  <ChevronUpMini className="rotate-180" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {compareProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={product.thumbnail || ""}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base-regular">{product.title}</h4>
                    <button
                      className="text-small-regular text-gray-500"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {compareProducts.length === 2 && (
              <Link
                href={`/products/compare/${compareProducts[0].handle}/${compareProducts[1].handle}`}
                className="block w-full text-center bg-gray-900 text-white py-2 rounded-full mt-4"
              >
                Compare Products
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CompareDrawer