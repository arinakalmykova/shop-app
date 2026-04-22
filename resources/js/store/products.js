import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import {useAuthStore} from './auth';

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
        const response = await axios.get('/api/products', {params});
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
    try {
      const response = await axios.get(`/api/products/${id}`);
      product.value = response.data;
    } catch (e) {
      error.value = 'не удалось загрузить товар';
    } finally {
      loading.value = false;
    }
  }

  const createProduct = async(data)=> {
    const auth = useAuthStore();
    return axios.post('/api/products',data, {
        headers: auth.getAuthHeaders(),
    });
  }

  const updateProduct= async(data,id)=> {
    const auth = useAuthStore();
    return axios.put(`/api/products/${id}`,data, {
        headers: auth.getAuthHeaders(),
    });
  }

  const deleteProduct= async(id)=> {
    const auth = useAuthStore();
    await axios.delete(`/api/products/${id}`, {
        headers: auth.getAuthHeaders(),
    });

    products.value = products.value.filter((product) => product.id !== id);
  }

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
    deleteProduct
  }

})

