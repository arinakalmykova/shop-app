<template>
    <div class="min-h-screen">
        <header class="flex justify-between items-center px-10 py-7 border-b border-border">
            <Link href="/" customClass="text-2xl font-bold uppercase text-gray-dark">Shop App</Link>
            <nav class="flex gap-4" v-if="user">
                <Link href="/admin/products" customClass="text-gray-dark">Управление товарами</Link>
                <Button @click="authStore.logout" customClass="text-gray-dark">Выйти</Button>
            </nav>
            <nav class="flex gap-4" v-else>
             <Link href="/" customClass="text-gray-dark">Главная</Link>
                <Link href="/login" customClass="text-gray-dark">Войти</Link>
            </nav>
        </header>
        <main class="mx-auto px-6 py-10 max-w-7xl">
            <slot/>
        </main>
    </div>
</template>

<script setup>
import Link from '../Components/Link.vue';
import {useAuthStore} from "../store/auth";
import { computed } from 'vue';
import Button from '../Components/Button.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>