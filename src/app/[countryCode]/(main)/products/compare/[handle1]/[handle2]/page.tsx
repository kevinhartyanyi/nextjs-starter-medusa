// app/compare/[handle1]/[handle2]/page.tsx
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import CompareTemplate from "@modules/products/templates/products-compare"

type Props = {
  params: {
    handle1: string
    handle2: string
    countryCode?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle1, handle2 } = params
  const countryCode = params.countryCode || "US"

  const products = await Promise.all([
    listProducts({
      countryCode,
      queryParams: { handle: handle1 },
    }),
    listProducts({
      countryCode,
      queryParams: { handle: handle2 },
    }),
  ]).then(([res1, res2]) => [res1.response.products[0], res2.response.products[0]])

  if (!products[0] || !products[1]) {
    notFound()
  }

  return {
    title: `Compare: ${products[0].title} vs ${products[1].title} | Medusa Store`,
    description: `Compare ${products[0].title} with ${products[1].title}`,
  }
}

export default async function ComparePage({ params }: Props) {
  const { handle1, handle2 } = params
  const countryCode = params.countryCode || "US"
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const products = await Promise.all([
    listProducts({
      countryCode,
      queryParams: { handle: handle1 },
    }),
    listProducts({
      countryCode,
      queryParams: { handle: handle2 },
    }),
  ]).then(([res1, res2]) => [res1.response.products[0], res2.response.products[0]])

  if (!products[0] || !products[1] || products[0].id === products[1].id) {
    notFound()
  }

  return (
    <CompareTemplate
      products={products}
      region={region}
      countryCode={countryCode}
    />
  )
}