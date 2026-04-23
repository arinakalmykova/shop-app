import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCategoriesApi } from '../composables/useCategoriesApi'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchCategories = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await useCategoriesApi().fetchCategories()
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