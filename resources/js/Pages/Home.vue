<template>
    <div class="space-y-10">
        <div>
            <h1 class="text-4xl font-bold">Каталог товаров</h1>
            <p class="text-xl mt-4">
                Просмотр товаров с фильтров по категориям
            </p>
        </div>
        <div class="flex flex-col gap-10">
            <Input
                type="text"
                name="search"
                id="search"
                placeholder="Поиск"
                v-model="search"
            />
            <div class="flex justify-between gap-4">
                <select v-model="selectedCategory">
                    <option value="">Все категории</option>
                    <option
                        v-for="category in categories"
                        :value="category.id"
                        :key="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
                <div class="flex gap-4">
                  <Link
                      v-if="user"
                      href="/admin/products/create"
                      customClass="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
                      >Добавить товар</Link
                  >
                  <Input
                      type="checkbox"
                      v-model="withTrash"
                      label="Показать удаленные товары"
                  />
                </div>
            </div>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
            <div v-for="product in products" :key="product.id">
                <ProductCard :product="product"></ProductCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import { useProductsStore } from "../store/products";
import { useCategoriesStore } from "../store/categories";
import ProductCard from "../Components/ProductCard.vue";
import Button from "../Components/Button.vue";
import { useAuthStore } from "../store/auth";
import Link from "../Components/Link.vue";
import Input from "../Components/Input.vue";

const withTrash = ref(false);
const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const products = computed(() => productsStore.products);
const categories = computed(() => categoriesStore.categories);
const selectedCategory = ref("");
const loading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);
const search = ref('');

const user = computed(() => useAuthStore().user);

onMounted(async () => {
    await fetchFilteredProducts();
    await categoriesStore.fetchCategories();
});

defineOptions({
    layout: MainLayout,
});

const clickProductCard = (product) => {
    window.location.href = `/product/${product.id}`;
};

let timeout = null;

const fetchFilteredProducts = async () => {
    await productsStore.fetchProducts({
        category_id: selectedCategory.value,
        search: search.value,
        checkDeleted: withTrash.value ? 1 : undefined,
    });
};

watch(selectedCategory, fetchFilteredProducts);
watch(withTrash, fetchFilteredProducts);

watch(search, async (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        await fetchFilteredProducts();
    }, 500);
});
</script>
