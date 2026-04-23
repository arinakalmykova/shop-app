<template>
    <div
        :key="product.id"
        class="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
    >
        <div class="mb-4">
            <h3 class="text-gray-900 mb-2">{{ product.name }}</h3>
            <span class="inline-block px-3 py-1 bg-blue-50 text-primary rounded-lg text-sm">
                {{ product.category.name }}
            </span>
            <span
                v-if="product.deleted_at"
                class="ml-2 inline-block px-3 py-1 bg-red-50 text-danger rounded-lg text-sm"
            >
                Удален
            </span>
        </div>

        <p class="text-gray-600 mb-4 text-sm">{{ product.description }}</p>
        <span class="text-primary">{{ product.price }} ₽</span>

        <div class="flex flex-col items-start mt-6 gap-4">
            <Link v-if="!product.deleted_at" :href="`/product/${product.id}`">
                Подробнее
            </Link>

            <Link
                v-if="user && !product.deleted_at"
                :href="`/admin/products/${product.id}/edit`"
            >
                Редактировать
            </Link>

            <Button v-if="user && !product.deleted_at" @click="openModal(product.id)">
                Удалить
            </Button>

            <Button
                v-if="user && product.deleted_at"
                type="button"
                customClass="px-6 py-3 bg-success text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                @click="restoreProduct(product.id)"
            >
                Восстановить
            </Button>

            <ConfirmModal
                :show="showModal"
                @cancel="showModal = false"
                @confirm="deleteProduct(deleteId)"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Button from "../Components/Button.vue";
import ConfirmModal from "../Components/ConfirmModal.vue";
import Link from "../Components/Link.vue";
import { useAuthStore } from "../store/auth";
import { useProductsStore } from "../store/products";

defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const showModal = ref(false);
const deleteId = ref(null);
const productsStore = useProductsStore();
const user = computed(() => useAuthStore().user);

const openModal = (id) => {
    showModal.value = true;
    deleteId.value = id;
};

const deleteProduct = async (id) => {
    await productsStore.deleteProduct(id);
    showModal.value = false;
};

const restoreProduct = async (id) => {
    await productsStore.restoreProduct(id);
};
</script>
