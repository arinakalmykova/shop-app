<template>
<div class="space-y-10">
  <div>
    <h1 class="text-4xl font-bold">Каталог товаров</h1>
    <p class="text-xl mt-4">Просмотр товаров с фильтров по категориям</p>
  </div>
  <div class="flex justify-between items-center">
  <select v-model="selectedCategory">
    <option value="">Все категории</option>
    <option v-for="category in categories" :value="category.id" :key="category.id">{{category.name}}</option>
  </select>
  <Link v-if="user" href="/admin/products/create" class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm">Добавить товар</Link>
  </div>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product"></ProductCard>
    </div>
  </div>
</div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import {useProductsStore} from "../store/products";
import {useCategoriesStore} from "../store/categories";
import ProductCard from "../Components/ProductCard.vue";
import Button from "../Components/Button.vue";
import {useAuthStore} from "../store/auth";
import Link from "../Components/Link.vue";

const productsStore=useProductsStore();
const categoriesStore=useCategoriesStore();
const products = computed(() => productsStore.products);
const categories = computed(() => categoriesStore.categories);
const selectedCategory=ref('');
const loading=ref(false);
const currentPage=ref(1);
const lastPage=ref(1);
const user = computed(() => useAuthStore().user);

onMounted(async ()=>{
  await productsStore.fetchProducts();
  await categoriesStore.fetchCategories();
});

watch(selectedCategory,async (value)=>{
  await productsStore.fetchProducts({category_id:value});
});

defineOptions({
  layout:MainLayout,
});

const clickProductCard=(product)=>{
  window.location.href=`/product/${product.id}`;
}

</script>
