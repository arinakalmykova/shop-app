<template>
<div class="flex flex-col gap-2">
    <label :for="id">{{label}}</label>
    <input class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" :type="type" :id="id" :name="name" :value="modelValue" :placeholder="placeholder" @input = "emit('update:modelValue', $event.target.value)" required>
</div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    label: String,
    type: {
        type: String,
        default: 'text',
    },
    id: {
        type: String,
        default: 'input-field',
    },
    name: String,
    placeholder: String,
});
const emit = defineEmits(['update:modelValue']);
</script>