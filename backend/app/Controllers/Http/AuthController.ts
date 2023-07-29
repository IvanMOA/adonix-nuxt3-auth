import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { z } from "zod";
import User from "App/Models/User";

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    const payload = await request.zValidate(
      z.object({
        email: z
          .string()
          .min(5)
          .max(50)
          .refine(async (email) => {
            const existingUser = await User.findBy("email", email);
            return existingUser === null;
          }, "Email already exists"),
        password: z.string().min(8).max(50),
      }),
    );
    const user = await User.create(payload);
    await auth.login(user);
    response.created({ message: "User registered" });
  }
  public async login({ request, auth, response }: HttpContextContract) {
    const payload = await request.zValidate(
      z.object({
        email: z.string().min(5).max(50),
        password: z.string().min(8).max(50),
      }),
    );
    try {
      await auth.attempt(payload.email, payload.password);
      return response.ok({ message: "Logged in" });
    } catch (e) {
      return response.status(400).json({
        message: "Email or password is incorrect",
      });
    }
  }
  public async me({ auth, request }: HttpContextContract) {
    return { user: auth.user ?? null };
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.ok({ message: "Logged out" });
  }
}
