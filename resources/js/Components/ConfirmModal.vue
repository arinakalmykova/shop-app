<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div class="bg-white rounded-xl p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Подтверждение</h2>

      <p class="text-gray-600 mb-6">
        Вы уверены, что хотите удалить товар?
      </p>

      <div class="flex justify-end gap-4">
        <Button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded-lg border"
        >
          Отмена
        </Button>

        <Button
          @click="$emit('confirm')"
          customClass="px-4 py-2 bg-danger hover:bg-red-700 text-white rounded-lg"
        >
          Удалить
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
defineProps({
  show: Boolean,
});
</script>