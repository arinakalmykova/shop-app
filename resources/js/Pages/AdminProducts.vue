<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between gap-4">
            <div>
                <h1 class="text-4xl font-bold">Управление товарами</h1>
                <p class="mt-3 text-gray-600">
                    Список товаров с действиями редактирования, удаления и восстановления
                </p>
            </div>

            <div class="flex items-center gap-4">
                <Input
                    type="checkbox"
                    v-model="withTrash"
                    label="Показать удаленные"
                />
                <Link
                    href="/admin/products/create"
                    customClass="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
                >
                    Добавить товар
                </Link>
            </div>
        </div>

        <div class="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <table class="min-w-full divide-y divide-border">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Название</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Категория</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Цена</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Статус</th>
                        <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700">Действия</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-border">
                    <tr v-for="product in products" :key="product.id">
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ product.name }}</div>
                            <div class="mt-1 text-sm text-gray-600">
                                {{ product.description }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-gray-700">{{ product.category?.name }}</td>
                        <td class="px-6 py-4 text-gray-900">{{ product.price }} ₽</td>
                        <td class="px-6 py-4">
                            <span
                                :class="product.deleted_at
                                    ? 'inline-block rounded-lg bg-red-50 px-3 py-1 text-sm text-danger'
                                    : 'inline-block rounded-lg bg-green-50 px-3 py-1 text-sm text-success'"
                            >
                                {{ product.deleted_at ? 'Удален' : 'Активен' }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex justify-end gap-3">
                                <Link
                                    v-if="!product.deleted_at"
                                    :href="`/admin/products/${product.id}/edit`"
                                    customClass="inline-block rounded-lg border border-border px-4 py-2 text-gray-dark transition-colors hover:text-primary"
                                >
                                    Редактировать
                                </Link>
                                <Button
                                    v-if="!product.deleted_at"
                                    type="button"
                                    customClass="rounded-lg bg-danger px-4 py-2 text-white transition-opacity hover:opacity-90"
                                    @click="openDeleteModal(product.id)"
                                >
                                    Удалить
                                </Button>
                                <Button
                                    v-if="product.deleted_at"
                                    type="button"
                                    customClass="rounded-lg bg-success px-4 py-2 text-white transition-opacity hover:opacity-90"
                                    @click="restoreProduct(product.id)"
                                >
                                    Восстановить
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="!products.length" class="px-6 py-10 text-center text-gray-600">
                Товары не найдены
            </div>
        </div>

        <div class="flex flex-col items-center gap-4">
            <p class="text-gray-600">
                Показано {{ from }}-{{ to }} из {{ total }} товаров
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3">
                <Button
                    :disabled="currentPage === 1"
                    type="button"
                    customClass="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                    @click="prevPage"
                >
                    Предыдущая
                </Button>
                <Button
                    v-for="page in pages"
                    :key="page"
                    type="button"
                    :disabled="page === currentPage"
                    :customClass="page === currentPage
                        ? 'px-4 py-3 bg-gray-dark text-white rounded-xl shadow-sm'
                        : 'px-4 py-3 bg-white text-gray-dark border border-border rounded-xl hover:text-primary transition-colors shadow-sm'"
                    @click="goToPage(page)"
                >
                    {{ page }}
                </Button>
                <Button
                    :disabled="currentPage === lastPage"
                    type="button"
                    customClass="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                    @click="nextPage"
                >
                    Следующая
                </Button>
            </div>
            <p class="text-gray-600">Страница {{ currentPage }} из {{ lastPage }}</p>
        </div>

        <ConfirmModal
            :show="showDeleteModal"
            @cancel="showDeleteModal = false"
            @confirm="deleteProduct"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import { useAuthStore } from "../store/auth";
import { useProductsStore } from "../store/products";
import Button from "../Components/Button.vue";
import ConfirmModal from "../Components/ConfirmModal.vue";
import Input from "../Components/Input.vue";
import Link from "../Components/Link.vue";

defineOptions({
    layout: MainLayout,
});

const authStore = useAuthStore();
const productsStore = useProductsStore();

const withTrash = ref(false);
const currentPage = ref(1);
const showDeleteModal = ref(false);
const productToDelete = ref(null);

const products = computed(() => productsStore.products);
const lastPage = computed(() => productsStore.lastPage || 1);
const total = computed(() => productsStore.total || 0);
const from = computed(() => productsStore.from || 0);
const to = computed(() => productsStore.to || 0);
const pages = computed(() =>
    Array.from({ length: lastPage.value }, (_, index) => index + 1)
);

const fetchProducts = async () => {
    await productsStore.fetchProducts({
        page: currentPage.value,
        checkDeleted: withTrash.value ? 1 : undefined,
    });
    currentPage.value = productsStore.currentPage || 1;
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchProducts();
    }
};

const nextPage = () => {
    if (currentPage.value < lastPage.value) {
        currentPage.value++;
        fetchProducts();
    }
};

const goToPage = (page) => {
    if (page !== currentPage.value) {
        currentPage.value = page;
        fetchProducts();
    }
};

const openDeleteModal = (id) => {
    productToDelete.value = id;
    showDeleteModal.value = true;
};

const deleteProduct = async () => {
    if (productToDelete.value) {
        await productsStore.deleteProduct(productToDelete.value);
        await fetchProducts();
    }

    showDeleteModal.value = false;
    productToDelete.value = null;
};

const restoreProduct = async (id) => {
    await productsStore.restoreProduct(id);
    await fetchProducts();
};

watch(withTrash, () => {
    currentPage.value = 1;
    fetchProducts();
});

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        window.location.href = "/login";
        return;
    }

    await fetchProducts();
});
</script>
