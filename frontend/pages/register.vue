<script setup lang="ts">
type UnsavedUser = {
  name: string;
  password: string;
};
type User = {
  name: string;
};
const { $api } = useNuxtApp();
const user = await useUser();
const form = useForm({
  email: "",
  password: "",
});
async function login() {
  try {
    await form.value.submit("POST", $api("/auth/register"));
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="min-h-screen min-w-screen py-12">
    <div class="bg-white max-w-xl mx-auto p-8">
      <div>
        <h1 class="mb-4">Register</h1>
        <NuxtLink to="/login">login</NuxtLink>
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
          <UButton :disabled="form.isSubmitting" type="submit"
            >Register</UButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
