<template>
    <label :for="email">{{label}}</label>
    <input type="email" id="email" name="email" :value="modelValue" @input = "emit('update:modelValue', $event.target.value)" required>
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
});
const emit = defineEmits(['update:modelValue']);
</script>