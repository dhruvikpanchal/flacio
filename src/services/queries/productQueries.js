import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../productService";

/**
 * TANSTACK QUERY KEYS
 */
export const productKeys = {
  all: ["products"],
  lists: () => [...productKeys.all, "list"],
  list: (params) => [...productKeys.lists(), params],
  details: () => [...productKeys.all, "detail"],
  detail: (handle) => [...productKeys.details(), handle],
  collections: (options) => ["collections", options],
  featured: () => ["featured-products"],
};

/* ------------------------------------------------------------------ *
 * 1. TANSTACK QUERY HOOKS (Reusable)
 * ------------------------------------------------------------------ */

/**
 * Reusable TanStack Query hook to fetch products with filtering & sorting
 * @param {Object} params - { collection, sortBy, inStock, minPrice, maxPrice, colors, sizes, query }
 * @param {Object} queryOptions - options passed to useQuery
 */
export function useProductsQuery(params = {}, queryOptions = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    ...queryOptions,
  });
}

/**
 * Reusable TanStack Query hook to fetch a single product by handle
 * @param {string} handle
 * @param {Object} queryOptions
 */
export function useProductQuery(handle, queryOptions = {}) {
  return useQuery({
    queryKey: productKeys.detail(handle),
    queryFn: () => productService.getProductByHandle(handle),
    enabled: Boolean(handle),
    ...queryOptions,
  });
}

/**
 * Reusable TanStack Query hook to fetch category collections
 * @param {Object} options
 * @param {Object} queryOptions
 */
export function useCollectionsQuery(options = {}, queryOptions = {}) {
  return useQuery({
    queryKey: productKeys.collections(options),
    queryFn: () => productService.getCollections(options),
    staleTime: 1000 * 60 * 10,
    ...queryOptions,
  });
}

/**
 * Reusable TanStack Query hook to fetch sidebar featured products
 * @param {Object} queryOptions
 */
export function useFeaturedProductsQuery(queryOptions = {}) {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => productService.getFeaturedProducts(),
    staleTime: 1000 * 60 * 10,
    ...queryOptions,
  });
}

/* ------------------------------------------------------------------ *
 * 2. REUSABLE useEffect HOOK & DIRECT FETCHER (for useEffect usage)
 * ------------------------------------------------------------------ */

/**
 * Reusable async fetcher function
 * Can be used directly inside any component's useEffect:
 *
 * useEffect(() => {
 *   fetchProducts(params).then(setProducts).catch(console.error);
 * }, [params]);
 */
export async function fetchProducts(params = {}) {
  return productService.getProducts(params);
}

/**
 * Reusable custom hook that handles data fetching with standard React useEffect
 * Provides an alternative or companion to TanStack Query
 *
 * const { products, loading, error, refetch } = useProductsEffect(params);
 */
export function useProductsEffect(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serialize params for stable useEffect dependency comparison
  const paramsKey = JSON.stringify(params);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const parsedParams = paramsKey ? JSON.parse(paramsKey) : {};
      const data = await productService.getProducts(parsedParams);
      setProducts(data);
    } catch (err) {
      setError(err?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => {
    let isMounted = true;
    const parsedParams = paramsKey ? JSON.parse(paramsKey) : {};

    productService
      .getProducts(parsedParams)
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Failed to load products");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [paramsKey]);

  return {
    products,
    loading,
    error,
    refetch: loadData,
  };
}

