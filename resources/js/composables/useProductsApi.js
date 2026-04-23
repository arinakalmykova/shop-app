import { useApiClient } from "./useApiClient";

export function useProductsApi() {
  const api = useApiClient();

  const fetchProducts = (params = {}) => {
    return api.get("/api/products", { params });
  };

  const fetchProduct = (id) => {
    return api.get(`/api/products/${id}`);
  };

  const createProduct = (data) => {
    return api.post("/api/products", data);
  };

  const updateProduct = (id, data) => {
    return api.put(`/api/products/${id}`, data);
  };

  const deleteProduct = (id) => {
    return api.del(`/api/products/${id}`);
  };

  const restoreProduct = (id) => {
    return api.post(`/api/products/${id}/restore`);
  };

  return {
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct,
  };
}