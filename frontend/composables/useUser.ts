type User = {
  id: string;
};

export async function useUser() {
  const user = useState("user", () => null as User | null);
  const { $api } = useNuxtApp();
  const headers = useRequestHeaders(["cookie"]);
  if (user.value === null) {
    const { data, error } = await useFetch($api("/auth/me"), {
      headers,
      credentials: "include",
    });
    user.value = (data.value as { user: User }).user;
  } else {
    console.log("User already fetched");
  }
  return user;
}
