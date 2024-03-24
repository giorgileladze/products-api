<script setup>
import router from '@/router';

const { product } = defineProps(['product']);

</script>

<template>
    <div class="card" @click="router.push({name: 'product details', params: {productId: product._id}})">
        <img :src="product.img" />
        <div class="details">
            <h3>{{ product.name }}</h3>
            <p>{{ product.smallDescription }}</p>
            <p class="spans">
                <span>{{ product.price }}$</span>
                <span>in stock: {{ product.quantity }}</span>
            </p>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 2px solid gray;
    width: 300px;
    border-radius: 15px;
    padding: 4px;
    cursor: pointer;
    transition: 0.3s ease-in-out scale;
}

.card:hover {
    scale: 1.05;
}

.card img {
    width: 290px;
    height: 350px;
    border-radius: 15px;
}

.details {
    padding: 10px 5px;
}

.spans {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid gray;
}

.spans span:nth-child(2n - 1){
    color: green;
    font-weight: bold;
}
</style>