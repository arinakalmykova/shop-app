<template>
    <button :type="type" @click="emit('click')">{{text}}</button>
</template>

<script setup>
    const props = defineProps({
        type: {
            type: String,
            default: 'submit',
        },
        text: {
            type: String,
            default: 'Submit',
        },
    });

    const emit = defineEmits(['click']);
</script>