<script setup lang="ts">
type UnsavedUser = {
  name: string;
  password: string;
};
type User = {
  name: string;
};
const {
  public: { api },
} = useRuntimeConfig();
const form = useForm({
  name: "",
  password: "",
});
async function createUser() {
  try {
    await form.value.submit("POST", api + "/users");
    console.log("success boi");
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="bg-red-50 min-h-screen min-w-screen py-12">
    <div class="bg-white max-w-xl mx-auto p-8">
      <div>
        <h1>This is a form</h1>
        <form @submit.prevent="createUser">
          <BaseField
            v-model="form.name"
            name="name"
            type="text"
            :error-bag="form.errorBag"
          />
          <BaseField
            v-model="form.password"
            name="password"
            type="password"
            :error-bag="form.errorBag"
          />
          <button>Submit</button>
        </form>
      </div>
      <div></div>
    </div>
  </div>
</template>
