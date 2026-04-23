import { useApiClient } from "./useApiClient";

export function useCategoriesApi() {
  const api = useApiClient();

  const fetchCategories = () => {
    return api.get("/api/categories");
  };

  return {
    fetchCategories,
  };
}