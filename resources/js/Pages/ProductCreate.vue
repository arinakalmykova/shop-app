<template>
  <div class="mx-auto max-w-3xl space-y-8">
    <div>
      <h1 class="text-4xl font-bold">Создание товара</h1>
      <p class="mt-3 text-gray-600">
        Заполните поля для добавления нового товара
      </p>
    </div>

    <div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <ProductForm
        :categories="categories"
        :error="error"
        submit-text="Создать товар"
        @submit="handleCreate"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import MainLayout from '../Layouts/MainLayout.vue'
import ProductForm from '../Components/ProductForm.vue'
import { useProductsStore } from '../store/products'
import { useCategoriesStore } from '../store/categories'

defineOptions({
  layout: MainLayout,
})

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const categories = computed(() => categoriesStore.categories)
const error = ref('')

onMounted(async () => {
  await categoriesStore.fetchCategories()
})

const handleCreate = async (formData) => {
  error.value = ''

  try {
    await productsStore.createProduct(formData)
    window.location.href = '/admin/products'
  } catch (e) {
    error.value = e.response?.data?.message || 'Не удалось создать товар'
  }
}
</script>