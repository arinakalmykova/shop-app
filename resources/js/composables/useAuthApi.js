import { useApiClient } from "./useApiClient";

export function useAuthApi() {
  const api = useApiClient();

  const login = (credentials) => {
    return api.post("/api/login", credentials);
  };

  const logout = () => {
    return api.post("/api/logout");
  };

  return {
    login,
    logout,
  };
}