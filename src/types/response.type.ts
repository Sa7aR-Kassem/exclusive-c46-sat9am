import { Category } from "@/interfaces/categories.interface";
import { ListingResponse } from "@/interfaces/listing.api.interface";
import { Product } from "@/interfaces/products.interface";

export type CategoriesResponse = ListingResponse<Category>;
export type ProductsResponse = ListingResponse<Product>;

export type SingleProduct = {
  data: Product;
};
