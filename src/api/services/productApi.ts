import { ProductType } from "../types/productType"

export async function getAllProducts(keyword?: string): Promise<ProductType[]>{

try {

const url = keyword
  ? `https://ecommerce.routemisr.com/api/v1/products?keyword=${encodeURIComponent(keyword)}`
  : 'https://ecommerce.routemisr.com/api/v1/products'

const response =await fetch(url , {
    cache: keyword ? 'no-store' : 'force-cache'
})
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data
    
} catch (error) {

throw new Error('API Error')
    
}

}


// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b


export async function getProductsByBrand(brandId: string): Promise<ProductType[]> {

try {

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data

} catch (error) {

throw new Error('API Error')

}

}


export async function getProductsBySubcategory(subcategoryId: string): Promise<ProductType[]> {

try {

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`)
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data

} catch (error) {

throw new Error('API Error')

}

}


export async function getProductsByCategory(categoryId: string): Promise<ProductType[]> {

try {

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data

} catch (error) {

throw new Error('API Error')

}

}


export async function getSingleProduct(prodId:string): Promise<ProductType>{

try {

const response =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`)
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data
    
} catch (error) {

throw new Error('API Error')
    
}

}