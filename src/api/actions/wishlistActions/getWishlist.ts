'use server'

import { getTokenFun } from "@/utilities/getTokenData"

export async function getWishlist() {

    // get token
    const token = await getTokenFun()
    if (!token) {
        throw new Error('Unauthorized')
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'GET',
            headers: {
                token: token,
                'Content-type': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Unauthorized')

        const payload = await response.json()

        console.log(payload);

        return payload

    } catch (error) {

        throw new Error('Unauthorized')

    }

}
