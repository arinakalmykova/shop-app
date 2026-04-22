<template>
    <div>
        <h1>Вход</h1>
        <form>
            <Input label="Email" type="email" id="email" name="email" v-model="email" required>
            </Input>
            <Input label="Пароль" type="password" id="password" name="password" v-model="password" required>
            </Input>
            <Button type="submit" @click="submit">{{authStore.loading? 'Входим...': 'Войти'}}</Button>
            <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {{ authStore.error }}
            </div>
        </form>
    </div>
</template>

<script setup>
import Button from "../Components/Button.vue";
import Input from "../Components/Input.vue";
import MainLayout from "../Layouts/MainLayout.vue";
import {ref} from "vue";
import axios from "axios";
import {useAuthStore} from "../store/auth";

defineOptions({
    layout: MainLayout,
});

const authStore = useAuthStore();
const email = ref('');
const password = ref('');


const submit = async () => {
    await authStore.login({
        email: email.value,
        password: password.value
    });
    window.location.href = '/admin/products';
};
</script>

