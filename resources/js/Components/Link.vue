<template>
  <InertiaLink :href="href" :class="customClass? customClass : baseClass">
    <slot />
  </InertiaLink>
</template>

<script setup>
import { Link as InertiaLink } from "@inertiajs/vue3";

defineProps({
  href: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const baseClass =
  " w-full inline-block px-6 py-3 bg-primary text-center text-white rounded-xl hover:bg-primary-dark transition-colors";
</script>