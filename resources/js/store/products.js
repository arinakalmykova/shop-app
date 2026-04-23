import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useProductsApi } from '../composables/useProductsApi';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const product = ref(null);
  const loading = ref(false);
  const error = ref('');
  const currentPage = ref(1);
  const lastPage = ref(1);

  const fetchProducts = async(params ={}) => {
    loading.value = true;
    error.value = '';
    try {
        const response = await useProductsApi().fetchProducts(params);
        products.value=response.data.data;
        currentPage.value=response.data?.meta?.current_page;
        lastPage.value=response.data?.meta?.last_page;
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
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct
  }

})

