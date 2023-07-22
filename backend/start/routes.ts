import Route from "@ioc:Adonis/Core/Route";
import { schema, rules, validator } from "@ioc:Adonis/Core/Validator";
import { z } from "zod";
const users = [{ name: "John Doe" }];
Route.get("/users", async () => {
  return { users };
});
Route.post("/users", async ({ request, response }) => {
  const payload = request.zValidate(
    z.object({
      name: z.string().min(5).max(50),
      password: z.string().min(8).max(50),
    }),
  );
  users.push(payload);
  return response.created(payload);
});
