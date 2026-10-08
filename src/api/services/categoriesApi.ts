import { Category, Subcategory } from "../types/productType";

// Get all categories
export async function getShopCategory(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("Get Categories Error:", error);
    throw error;
  }
}

// Get single category
export async function getSingleCategory(
  categoryId: string
): Promise<Category> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("Get Single Category Error:", error);
    throw error;
  }
}

// Get subcategories
export async function getSubcategories(
  categoryId: string
): Promise<Subcategory[]> {
  try {
    const response = await fetch(
     `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("Get Subcategories Error:", error);
    throw error;
  }
}