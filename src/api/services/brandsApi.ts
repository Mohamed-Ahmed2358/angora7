import { Brand } from "../types/productType"

export async function getAllBrands(): Promise<Brand[]> {

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
            cache: 'force-cache'
        })
        if (!response.ok) throw new Error('API Error')
        const payload = await response.json()
        return payload.data

    } catch (error) {
        throw new Error('API Error')
    }
}

// https://ecommerce.routemisr.com/api/v1/brands/6439d76dc6e0c95cc5975015

export async function getSingleBrand(brandId: string): Promise<Brand> {

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
        if (!response.ok) throw new Error('API Error')
        const payload = await response.json()
        return payload.data

    } catch (error) {
        throw new Error('API Error')
    }
}
