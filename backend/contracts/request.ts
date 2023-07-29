declare module "@ioc:Adonis/Core/Request" {
  import { z } from "zod";
  interface RequestContract {
    zValidate<T extends z.ZodRawShape>(
      schema: z.ZodObject<T>,
    ): Promise<z.infer<typeof schema>>;
  }
}
