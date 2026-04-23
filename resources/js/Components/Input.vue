<template>
    <div :class="wrapperClass">
        <label v-if="label" :for="id">{{ label }}</label>
        <input
            :class="inputClass"
            :type="type"
            :id="id"
            :name="name"
            :value="type === 'checkbox' ? undefined : modelValue"
            :checked="type === 'checkbox' ? modelValue : undefined"
            :placeholder="placeholder"
            :required="required"
            @input="handleInput"
            @change="handleChange"
        >
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: [String, Number, Boolean],
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
    required: {
        type: Boolean,
        default: false,
    },
    classCustom: String,
    customClass: String,
});
const emit = defineEmits(['update:modelValue']);

const baseClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";
const checkboxClass = "h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-blue-500";

const wrapperClass = computed(() => {
    return props.type === 'checkbox'
        ? 'flex flex-row items-center gap-2'
        : 'flex flex-col gap-2';
});

const inputClass = computed(() => {
    return props.classCustom || props.customClass || (props.type === 'checkbox' ? checkboxClass : baseClass);
});

const handleInput = (event) => {
    if (props.type !== 'checkbox') {
        emit('update:modelValue', event.target.value);
    }
};

const handleChange = (event) => {
    if (props.type === 'checkbox') {
        emit('update:modelValue', event.target.checked);
    }
};
</script>
