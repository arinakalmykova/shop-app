<template>
    <div class="min-h-screen">
        <header class="flex justify-between items-center px-10 py-7 border-b border-border">
            <Link class="text-2xl font-bold uppercase text-gray-dark">Shop App</Link>
            <nav class="flex gap-4">
                <Link href="/">Главная</Link>
                <Link href="/login">Войти</Link>
                <Link href="/admin/products">Админка</Link> 
            </nav>
        </header>
        <main class="mx-auto px-6 py-10 max-w-7xl">
            <slot/>
        </main>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>