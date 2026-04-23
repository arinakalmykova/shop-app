<template>
  <div class="mx-auto max-w-3xl space-y-8">
    <div>
      <h1 class="text-4xl font-bold">Редактирование товара</h1>
      <p class="mt-3 text-gray-600">
        Измените поля для обновления товара
      </p>
    </div>

    <div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <ProductForm
        v-if="product"
        :product="product"
        :categories="categories"
        :error="error"
        submit-text="Сохранить"
        @submit="handleUpdate"
        />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import ProductForm from "../Components/ProductForm.vue";
import { useProductsStore } from "../store/products";
import { useCategoriesStore } from "../store/categories";

defineOptions({
  layout: MainLayout,
});

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();

const product = computed(() => productsStore.product);
const categories = computed(() => categoriesStore.categories);
const error = ref("");

const productId = window.location.pathname.split("/").slice(-2, -1)[0];

onMounted(async () => {
  await categoriesStore.fetchCategories();
  await productsStore.fetchProduct(productId);
});

const handleUpdate = async (formData) => {
  error.value = "";

  try {
    await productsStore.updateProduct(productId, formData);
    window.location.href = "/admin/products";
  } catch (e) {
    error.value = e.response?.data?.message || "Не удалось обновить товар";
  }
};
</script>