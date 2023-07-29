import { ErrorBag } from "~/utilities/ErrorBag";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const toast = useToast();
  const internal = ref({
    ...initialValues,
    originalValues: initialValues,
    isSubmitting: false,
    errorBag: new ErrorBag({}),
    submitFailed: false,
    clearErrors() {
      internal.value.errorBag = new ErrorBag({});
      internal.value.submitFailed = false;
    },
    values() {
      return Object.keys(internal.value.originalValues).reduce(
        (acc, key) => ({
          ...acc,
          // @ts-ignore
          [key]: internal.value[key],
        }),
        {} as T,
      );
    },
    async submit(method: "POST", url: string) {
      return new Promise(async (resolve, reject) => {
        try {
          internal.value.clearErrors();
          internal.value.isSubmitting = true;
          const response = await fetch(url, {
            method,
            credentials: "include",
            body: JSON.stringify(internal.value.values()),
            headers: {
              "content-type": "application/json",
            },
          });
          await sleep(500);
          const data = await response.json();
          if (response.status === 422) {
            internal.value.isSubmitting = false;
            internal.value.errorBag = new ErrorBag(data.errors);
            internal.value.submitFailed = true;
            reject(data);
            return;
          }
          if (response.ok) {
            internal.value.isSubmitting = false;
            resolve(data);
            return;
          }
          internal.value.isSubmitting = false;
          toast.add({ title: data?.message ?? "Unknown error" });
          reject(data);
        } catch (e) {
          toast.add({ title: "Unknown error" });
          internal.value.isSubmitting = false;
          reject(e);
        }
      });
    },
  });
  return internal;
}
