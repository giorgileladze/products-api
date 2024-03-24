import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/axios'

export const useProducts = defineStore('products', () => {
    const products = ref({})
    const count = computed(() => {
        return Object.keys(products.value).length;
    })

    const addProduct = (product) => {
        products.value[product._id] = product;
    }

    const getProduct = (id) => {
        console.log(products);
        return products.value[id];
    }

    const fetchNewProducts = async () => {
        const response = await api.get('/products');
        const data = response.data;
        
        data.products.forEach(pr => {
            addProduct(pr);
        })
    }

    const fetchNewProductByID = async (id) => {
        const response = await api.get('/products/details/' + id);
        const data = response.data;
        
        addProduct(data);
    }

    function log () {
        console.log(products.value);
    }

    return { products, count, addProduct, getProduct, fetchNewProducts, fetchNewProductByID, log }
})
