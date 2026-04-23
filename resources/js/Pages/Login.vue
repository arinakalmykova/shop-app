<template>
    <div class=" flex items-center justify-center px-6 mt-32">
        <div class="w-full max-w-md">
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div class="text-center mb-8">
                    <h1 class="text-gray-dark text-2xl font-bold">
                        Войдите в свой аккаунт
                    </h1>
                </div>
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <Input
                            label="Email"
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            v-model="email"
                            required
                        />
                    </div>

                    <div>
                        <Input
                            label="Пароль"
                            placeholder="••••••••"
                            type="password"
                            id="password"
                            name="password"
                            v-model="password"
                            class="w-full"
                            required
                        />
                    </div>
                    <Button type="submit" class="w-full">{{
                        authStore.loading ? "Входим..." : "Войти"
                    }}</Button>
                    <Error v-if="authStore.error">
                        {{ authStore.error }}
                    </Error>
                </form>

                <div class="mt-6 text-center">
                    <Link href="/" customClass="w-full inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from "../Components/Button.vue";
import Input from "../Components/Input.vue";
import Error from "../Components/Error.vue";
import MainLayout from "../Layouts/MainLayout.vue";
import Link from "../Components/Link.vue";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

defineOptions({
    layout: MainLayout,
});

const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
    await authStore.login({
        email: email.value,
        password: password.value,
    });
    window.location.href = "/admin/products";
};
</script>
