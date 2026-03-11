export async function getProducts(limit: number = 40) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error(
        response.statusText + " Error occurred in fetching products",
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getProductDetails(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    if (!response.ok) {
      throw new Error(
        response.statusText + " Error occurred in fetching products",
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
