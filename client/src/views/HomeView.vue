<script setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { useProducts } from '@/stores/useProducts';
import ProductCard from '@/components/ProductCard.vue'

const store = useProducts();

onMounted(() => {
  store.fetchNewProducts();
})

</script>

<template>
  <main>
      <div class="products-list">
        <ProductCard v-for="product in store.products" :product="product" />
      </div>
  </main>
</template>

<style scoped>
.products-list {
  margin-top: 100px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-around;
  row-gap: 50px;
}

</style>