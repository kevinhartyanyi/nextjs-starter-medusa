import React from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"
import ProductPrice from "@modules/products/components/product-price"
import { ChevronLeft } from "@medusajs/icons"

type CompareTemplateProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  countryCode: string
}

const CompareTemplate: React.FC<CompareTemplateProps> = ({
  products,
  region,
  countryCode,
}) => {
  const ComparisonRow = ({
    label,
    children,
  }: {
    label: string
    children: React.ReactNode
  }) => (
    <div className="even:bg-gray-50">
      <div className="md:grid md:grid-cols-[240px_1fr_1fr]">
        <div className="font-medium text-gray-500 py-4 px-6 md:bg-transparent">
          {label}
        </div>
        <div className="md:contents">{children}</div>
      </div>
    </div>
  )

  return (
    <div className="min-h-[100vh] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b z-10 shadow-sm top-0">
        <div className="content-container py-4 md:py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Product Comparison
            </h1>
            <Link
              href={`/${countryCode}/store`}
              className="flex items-center gap-x-2 text-small-regular text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft />
              <span className="hidden md:inline">Back to store</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="content-container py-6 md:py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Product card */}
          <div className="block md:grid md:grid-cols-[240px_1fr_1fr] border-b">
            <div className="hidden md:block bg-gray-50"></div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`p-6 md:p-8 flex flex-col items-center gap-y-6 ${
                  idx !== 0 ? "border-t md:border-t-0 md:border-l" : ""
                }`}
              >
                <div className="aspect-square w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={product.thumbnail || ""}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  {product.title}
                </h3>
                <div className="text-lg">
                  <ProductPrice
                    product={product}
                    variant={product.variants?.[0]}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Comparisons */}
          <div className="divide-y">
            <ComparisonRow label="Description">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.description}
                </div>
              ))}
            </ComparisonRow>

            <ComparisonRow label="Variants">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.variants?.length || 0} available
                </div>
              ))}
            </ComparisonRow>

            <ComparisonRow label="Options">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.options?.map((opt) => (
                    <div key={opt.id} className="mb-2">
                      <span className="font-medium">{opt.title}: </span>
                      {opt.values?.map((v) => v.value).join(", ")}
                    </div>
                  ))}
                </div>
              ))}
            </ComparisonRow>

            <ComparisonRow label="Categories">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.categories?.map((cat) => cat.name).join(", ") ||
                    "None"}
                </div>
              ))}
            </ComparisonRow>

            <ComparisonRow label="Collection">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.collection?.title || "None"}
                </div>
              ))}
            </ComparisonRow>

            <ComparisonRow label="Type">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.type?.value || "Not specified"}
                </div>
              ))}
            </ComparisonRow>

            <ComparisonRow label="Tags">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`p-6 text-small-regular md:border-l relative ${
                    idx === 0 ? "border-t md:border-t-0" : "border-t"
                  }`}
                >
                  <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                    {product.title}
                  </div>
                  {product.tags?.map((tag) => tag.value).join(", ") || "None"}
                </div>
              ))}
            </ComparisonRow>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-x-8 mt-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="px-6 py-3 text-center text-small-regular text-gray-700 hover:text-gray-900 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              View {product.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompareTemplate
