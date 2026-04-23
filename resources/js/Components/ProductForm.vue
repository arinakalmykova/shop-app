<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <Input
      label="Название"
      placeholder="Введите название товара"
      type="text"
      id="name"
      name="name"
      v-model="form.name"
      required
    />

    <div class="flex flex-col gap-2">
      <label for="category_id">Категория</label>
      <select
        id="category_id"
        name="category_id"
        v-model="form.category_id"
        class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Выберите категорию</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label for="description">Описание</label>
      <textarea
        id="description"
        name="description"
        v-model="form.description"
        placeholder="Введите описание товара"
        class="min-h-32 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <Input
      label="Цена"
      placeholder="Введите цену"
      type="number"
      id="price"
      name="price"
      v-model="form.price"
      required
    />

    <Error v-if="error">
      {{ error }}
    </Error>

    <div class="flex gap-4">
      <Button type="submit">
        {{ submitText }}
      </Button>

      <Link
        href="/admin/products"
        :useBase="false"
        customClass="inline-block rounded-xl border border-gray-200 px-6 py-3 text-gray-dark transition-colors hover:text-primary"
      >
        Отмена
      </Link>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import Input from '../Components/Input.vue'
import Button from '../Components/Button.vue'
import Error from '../Components/Error.vue'
import Link from '../Components/Link.vue'

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  submitText: {
    type: String,
    default: 'Сохранить',
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  category_id: '',
  description: '',
  price: '',
})

watch(
  () => props.product,
  (value) => {
    if (value) {
      form.name = value.name ?? "";
      form.category_id = value.category_id ?? "";
      form.description = value.description ?? "";
      form.price = value.price ?? "";
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('submit', {
    name: form.name,
    category_id: form.category_id,
    description: form.description,
    price: form.price,
  })
}
</script>