import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCart = defineStore('cart', () => {
    const cart = ref({});
    const total = ref(0);

    return { cart, total }
})