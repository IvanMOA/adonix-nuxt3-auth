<script setup lang="ts">
type UnsavedUser = {
  name: string;
  password: string;
};
type User = {
  name: string;
};
const { $api } = useNuxtApp();
const user = useUser();
const form = useForm({
  email: "",
  password: "",
});
async function login() {
  try {
    await form.value.submit("POST", $api("/auth/login"));
    navigateTo("/");
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="min-h-screen min-w-screen py-12">
    <div class="bg-white max-w-xl mx-auto p-8">
      <div>
        <h1 class="mb-4">Login</h1>
        <NuxtLink to="/register">register</NuxtLink>
        <form @submit.prevent="login" class="flex flex-col space-y-2">
          <BaseField
            v-model="form.email"
            name="email"
            type="text"
            :error-bag="form.errorBag"
          />
          <BaseField
            v-model="form.password"
            name="password"
            type="password"
            :error-bag="form.errorBag"
          />
          <UButton :disabled="form.isSubmitting" type="submit">Login</UButton>
        </form>
      </div>
    </div>
  </div>
</template>
