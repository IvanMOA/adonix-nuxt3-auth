<script setup lang="ts">
import { ErrorBag } from "~/utilities/ErrorBag";

const props = defineProps<{
  errorBag: ErrorBag;
  name: string;
  placeholder: string;
  type: string;
}>();
const modelValue = defineModel();
</script>
<template>
  <div class="flex flex-col">
    <UInput v-model="modelValue" :placeholder="name" :type="type" />
    <small :class="{ 'opacity-0': !errorBag.has(name) }"
      >{{ errorBag.get(name) }}.</small
    >
  </div>
</template>
