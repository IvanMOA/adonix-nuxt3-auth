import { useUser } from "~/composables/useUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("auth middleware");
  const user = await useUser();
  const authPages = ["/login", "/register"];
  const privatePages = ["/"];
  console.log(to.path, user.value, "lol");
  if (user.value === null && privatePages.includes(to.path)) {
    return navigateTo("/login");
  }
  if (user.value !== null && authPages.includes(to.path)) {
    return navigateTo("/");
  }
});
