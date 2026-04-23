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
            <div v-for="product in filteredProducts" :key="product.id">
                <ProductCard :product="product"></ProductCard>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="flex gap-10 items-center">
                <Button
                    :disabled="currentPage === 1"
                    @click="prevPage"
                    customClass="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
                >
                    Предыдущая
                </Button>
                <p>Страница {{ currentPage }} из {{ countPages }}</p>
                <Button
                    :disabled="currentPage === lastPage"
                    @click="nextPage"
                    customClass="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
                >
                    Следующая
                </Button>
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
const search = ref('');
const user = computed(() => useAuthStore().user);
const countPages= computed(() => Math.ceil(products.value.length / 10));
const filteredProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * 10;
    const endIndex = startIndex + 10;
    return products.value.slice(startIndex, endIndex);
})


const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchFilteredProducts();
    }
};

const nextPage = () => {
    if (currentPage.value < countPages.value) {
        currentPage.value++;
        fetchFilteredProducts();
    }
};

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

watch(selectedCategory,() =>{
  currentPage.value = 1;
 fetchFilteredProducts()
 });

watch(withTrash, () => {
  currentPage.value = 1; 
  fetchFilteredProducts
});

watch(search, async (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        await fetchFilteredProducts();
    }, 500);
});
</script>
