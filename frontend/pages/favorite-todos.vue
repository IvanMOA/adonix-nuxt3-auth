<script setup lang="ts">
const user = await useUser();
</script>

<template>
  <h1>Fav todos</h1>
  <NuxtLink to="/">home</NuxtLink>
  <p>{{ user }}</p>
</template>
