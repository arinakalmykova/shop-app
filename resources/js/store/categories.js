import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchCategories = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get('/api/categories')
      categories.value = response.data.data
    } catch (e) {
      error.value = 'Не удалось загрузить категории'
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
})