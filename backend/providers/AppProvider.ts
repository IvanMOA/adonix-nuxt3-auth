import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Request = this.app.container.use("Adonis/Core/Request");
    Request.macro("zValidate", async function (schema) {
      return await schema.parseAsync(this.body());
    });
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
