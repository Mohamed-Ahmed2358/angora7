import { ProductType } from "./productType"

export interface WishlistResponseType {
  status: string
  count: number
  data: ProductType[]
}
