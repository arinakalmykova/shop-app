import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthApi } from '../composables/useAuthApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    loading.value = true
    error.value = ''

    try {
      const response = await useAuthApi().login('/api/login', credentials)

      token.value = response.data.token
      user.value = response.data.user

      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (e) {
      error.value = e.response?.data?.message || 'Ошибка входа'
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await axios.useAuthApi().logout();
      }
    } catch (e) {
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    getAuthHeaders,
    login,
    logout,
  }
})