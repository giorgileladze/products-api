<template>
    <header>
        <div>Logo</div>
        <div>
            <nav class="menu">
                <ul>
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/cart">cart</RouterLink></li>
                    <li><RouterLink to="/orders">orders</RouterLink></li>
                </ul>
            </nav>
        </div>
        <div>
            <div class="auth-buttons">
                <RouterLink to="/login">Log in</RouterLink>
                <RouterLink to="/signup">Sign up</RouterLink>
            </div>
        </div>
    </header>
</template>
  
<script setup>
import { RouterLink } from 'vue-router'
</script>
  
<style scoped>
header {
    display: flex;
    justify-content: space-between;
    margin: 1rem 3rem;
}

.menu ul{
    display: flex;
    flex-direction: row;
    gap: 30px;
    list-style: none;
}

.menu a {
    text-decoration: none;
    font-size: 20px;
    color: black;
}

.auth-buttons {
    display: flex;
    gap: 15px;
}

.auth-buttons a {
    text-decoration: none;
    color: black;
}

</style>
  