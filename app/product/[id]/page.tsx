import { products } from '@/lib/products'

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export { default } from './ProductPageClient'