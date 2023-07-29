<script setup lang="ts">
import { useForm } from "~/composables/useForm";

const user = await useUser();
const form = useForm({});
const { $api } = useNuxtApp();
async function logout() {
  try {
    await form.value.submit("POST", $api("/auth/logout"));
    user.value = null;
    navigateTo("/login");
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <h1>Bienvenido {{ user.email }}</h1>
  <NuxtLink to="/favorite-todos">fav todos</NuxtLink>
  <UButton @click="logout" :disabled="form.isSubmitting">Logout</UButton>
</template>
