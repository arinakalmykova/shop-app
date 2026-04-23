<template>
    <button :type="type" @click="emit('click')"  :class="customClass? customClass : baseClass">
        <slot />
    </button>
</template>

<script setup>
    const props = defineProps({
        type: {
            type: String,
            default: 'submit',
        },
        customClass: {
            type: String,
            default: "",
        },
    });

    const emit = defineEmits(['click']);

    const baseClass = "w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm";
</script>