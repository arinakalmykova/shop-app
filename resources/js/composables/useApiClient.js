import axios from "axios";
import { useAuthStore } from "../store/auth";

export function useApiClient() {
  const authStore = useAuthStore();

  const authHeaders = () => {
    if (!authStore.token) {
      return {};
    }

    return {
      Authorization: `Bearer ${authStore.token}`,
    };
  };

  const get = (url, config = {}) => {
    return axios.get(url, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...authHeaders(),
      },
    });
  };

  const post = (url, data = {}, config = {}) => {
    return axios.post(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...authHeaders(),
      },
    });
  };

  const put = (url, data = {}, config = {}) => {
    return axios.put(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...authHeaders(),
      },
    });
  };

  const patch = (url, data = {}, config = {}) => {
    return axios.patch(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...authHeaders(),
      },
    });
  };

  const del = (url, config = {}) => {
    return axios.delete(url, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...authHeaders(),
      },
    });
  };

  return {
    get,
    post,
    put,
    patch,
    del,
  };
}