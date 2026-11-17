import {
  getProductsApi,
  getProductByHandleApi,
  getCollectionsApi,
  getFeaturedProductsApi,
} from "../mock/api/productsApi";

/**
 * Product Service
 * Central business service for querying products and collections.
 * Handles API calls, data transformation, and response normalization.
 */
class ProductService {
  /**
   * Fetch all products matching query filters & sorting
   * @param {Object} params - { collection, sortBy, inStock, minPrice, maxPrice, colors, sizes, query }
   * @returns {Promise<Array>} Array of products
   */
  async getProducts(params = {}) {
    const response = await getProductsApi(params);
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch products");
    }
    return response.data;
  }

  /**
   * Fetch a single product by handle or ID
   * @param {string} handle
   * @returns {Promise<Object>} Product object
   */
  async getProductByHandle(handle) {
    const response = await getProductByHandleApi(handle);
    if (!response.success) {
      throw new Error(response.message || `Product not found: ${handle}`);
    }
    return response.data;
  }

  /**
   * Fetch collections (categories)
   * @param {Object} options - { includeHidden: boolean }
   * @returns {Promise<Array>} Array of collections
   */
  async getCollections(options = {}) {
    const response = await getCollectionsApi(options);
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch collections");
    }
    return response.data;
  }

  /**
   * Fetch sidebar featured products
   * @returns {Promise<Array>}
   */
  async getFeaturedProducts() {
    const response = await getFeaturedProductsApi();
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch featured products");
    }
    return response.data;
  }
}

export const productService = new ProductService();
export default productService;

