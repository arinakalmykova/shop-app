import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProductsApi } from '../composables/useProductsApi';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const product = ref(null);
  const loading = ref(false);
  const error = ref('');
  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(10);
  const total = ref(0);
  const from = ref(0);
  const to = ref(0);

  const fetchProducts = async(params ={}) => {
    loading.value = true;
    error.value = '';
    try {
        const response = await useProductsApi().fetchProducts(params);
        const meta = response.data?.meta || {};

        products.value = response.data.data;
        currentPage.value = meta.current_page || 1;
        lastPage.value = meta.last_page || 1;
        perPage.value = meta.per_page || products.value.length;
        total.value = meta.total || products.value.length;
        from.value = meta.from || (products.value.length ? 1 : 0);
        to.value = meta.to || products.value.length;

        return response;
    } catch (e){
        error.value='не удалось загрузить товары';
    } finally {
        loading.value = false;
    }
  }

  const fetchProduct = async (id) => {
    loading.value = true;
    error.value = '';
    product.value = null;
    try {
      const response = await useProductsApi().fetchProduct(id);
      product.value = response.data.data;
    } catch (e) {
      error.value = 'не удалось загрузить товар';
    } finally {
      loading.value = false;
    }
  }

  const createProduct = async(data)=> {
    return useProductsApi().createProduct(data);
  }

  const updateProduct= async(id, data)=> {
    return useProductsApi().updateProduct(id, data);
  }

  const deleteProduct= async(id)=> {
    await useProductsApi().deleteProduct(id);
    products.value = products.value.filter((product) => product.id !== id);
  }

  const restoreProduct = async (id) => {
    await useProductsApi().restoreProduct(id);
    await fetchProducts();
  };

  return {
    products,
    product,
    loading,
    error,
    currentPage,
    lastPage,
    perPage,
    total,
    from,
    to,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct
  }

})

