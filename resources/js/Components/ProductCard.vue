<template>
    <div :key="product.id" class="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div class="mb-4">
            <h3 class="text-gray-900 mb-2">{{ product.name }}</h3>
            <span class="inline-block px-3 py-1 bg-blue-50 text-primary rounded-lg text-sm">
                {{ product.category.name }}
            </span>
        </div>
        <p class="text-gray-600 mb-4 text-sm">{{ product.description }}</p>
        <span class="text-primary">{{ product.price }} ₽</span>
        <div class="flex flex-col flex-start mt-6 gap-4">
            <Link :href="`/product/${product.id}`">
                Подробнее
            </Link>
            <Link :href="`/admin/products/${product.id}/edit`" v-if="user">
              Редактировать
            </Link>
            <Button @click="deleteProduct(product.id)" v-if="user">
              Удалить
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from "../Components/Button.vue";
import Link from "../Components/Link.vue";
import { useAuthStore } from "../store/auth";
import { computed } from "vue";
import { useProductsStore } from "../store/products";

const productsStore = useProductsStore();
const user = computed(() => useAuthStore().user);
const props = defineProps({
    product: Object,
});

const emit = defineEmits(["click"]);

const deleteProduct = (id) => {
    productsStore.deleteProduct(id);
};

</script>
