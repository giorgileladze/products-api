<script setup>
import { onMounted, onUpdated } from 'vue';
import { useProducts as useProductsStore } from '@/stores/useProducts';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useProductsStore();
const id = route.params.productId;
onMounted(() => {
    const data = {...store.products}
    if(!data[id]){
        store.fetchNewProductByID(id);
    }
})

</script>

<template>
    <div class="product" v-if="store.products[id]">
        <div>
            <img :src="store.products[id].img" />
        </div>
        <div class="details">
            <h2>{{ store.products[id].name }}</h2>
            <p>{{ store.products[id].description }}</p>
            <p class="spans">
                <span>{{ store.products[id].price }}$</span>
                <span :style="{color: !store.products[id].quantity ? 'red' : 'green    '}">in stock: {{ store.products[id].quantity }}</span>
            </p>
            <div class="actions">
                <button :disabled="store.products[id].quantity === 0">Buy</button>
                <button :disabled="store.products[id].quantity === 0">Add In Cart</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.product {
    width: 100%;
    margin: 100px 0;
    padding: 30px;
    display: flex;
    flex-direction: row;
    gap: 30px;
}

.product img {
    width: 100%;
}

.details {
    position: relative;
}

.actions {
    position: absolute;
    bottom: 0;
    right: 0;
}

.actions button {
    margin: 0 15px;
    padding: 15px 25px;
    border: 1px solid gray;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
}

button:disabled {
    cursor: not-allowed;
}

.product h2 {
    margin-bottom: 20px;
}

.spans {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 200px;
    margin-top: 15px;
    padding-top: 5px;
    border-top: 1px solid gray;
}

.spans span:nth-child(2n - 1){
    color: green;
    font-weight: bold;
}
</style>