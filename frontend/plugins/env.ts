export default defineNuxtPlugin(() => {
  const {
    public: { api },
  } = useRuntimeConfig();
  return {
    provide: {
      api(path: string) {
        return api + path;
      },
    },
  };
});
