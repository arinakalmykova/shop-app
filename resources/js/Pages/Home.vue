<template>
<div class="space-y-4">
  <div>
    <h1 class="text-4xl font-bold">Каталог товаров</h1>
    <p class="text-xl mt-4">Просмотр товаров с фильтров по категориям</p>
  </div>
  <div>
  <select v-model="selectedCategory" @change="onChangeCategory">
    <option>Все категории</option>
    <option v-for="category in categories" :key="category.id">{{category.name}}</option>
  </select>
  </div>
</div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import {useProductsStore} from "../store/products";
import {useCategoriesStore} from "../store/categories";

const productsStore=useProductsStore();
const categoriesStore=useCategoriesStore();
const products=ref({});
const categories=ref([]);
const selectedCategory=ref('');
const loading=ref(false);
const error=ref('');
const currentPage=ref(1);
const lastPage=ref(1);

onMounted(async ()=>{
  await productsStore.fetchProducts();
  await categoriesStore.fetchCategories();
});

defineOptions({
  layout:MainLayout,
});

const onChangeCategory=(event)=>{
  selectedCategory.value=event.target.value;
}

</script>
