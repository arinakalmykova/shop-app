<template>
    <div
        v-if="product"
        class="bg-white border border-gray-200 rounded-xl p-12 shadow-sm"
    >
        <div class="mb-6">
            <span
                class="inline-block px-4 py-2 bg-blue-50 text-primary rounded-lg mb-4"
            >
                {{ product.category?.name }}
            </span>
            <h1 class="text-gray-900 mb-6">{{ product.name }}</h1>
        </div>

        <p class="text-gray-600 leading-relaxed mb-8">
            {{ product.description }}
        </p>

        <div class="mb-8 pb-8 border-b border-gray-200">
            <span class="text-primary text-3xl">{{ product.price }} ₽</span>
        </div>
        <div class="flex flex-row gap-4">
            <Link href="/">
                Вернуться к продуктам
            </Link>
            <Link :href = "`/admin/products/${product.id}/edit`" v-if="user">Редактировать</Link>
            <Button type="submit" v-if="user" @click="openModal(product.id)">Удалить</Button>
            <ConfirmModal :show="showModal" @cancel="showModal = false" @confirm="deleteProduct(deleteId)"></ConfirmModal>
        </div>
    </div>
    <div v-else class="text-gray-500">Загрузка...</div>
</template>

<script setup>
import Link from "../Components/Link.vue";
import {onMounted, computed, ref} from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import {useProductsStore} from "../store/products";
import {useAuthStore} from "../store/auth";
import Button from "../Components/Button.vue";
import ConfirmModal from "../Components/ConfirmModal.vue";

const deleteId = ref(null);
const showModal = ref(false);
const user = computed(() => useAuthStore().user);
const props = defineProps({
    product: Object,
});

defineOptions({
  layout: MainLayout,
});

const openModal = (id) => {
    showModal.value = true;
    deleteId.value = id;
}
const deleteProduct = async (id) => {
    await useProductsStore().deleteProduct(id);
    showModal.value = false;
    window.location.href = '/';
}

</script>
