import { getSingleProduct, getProductsByCategory } from '@/api/services/productApi'
import ProductDetailsView from '@/app/_component/ProductDetailsView/ProductDetailsView'
import React from 'react'

export default async function ProductDetails(props: { params: { id: string } }) {
  const params = await props.params
  const { id } = params

  const data = await getSingleProduct(id)

  const sameCategory = await getProductsByCategory(data.category._id)
  const related = sameCategory.filter((p) => p._id !== data._id).slice(0, 10)

  return <ProductDetailsView product={data} related={related} />
}
