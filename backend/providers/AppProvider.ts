import type { ApplicationContract } from "@ioc:Adonis/Core/Application";
import { z } from "zod";
import { HttpException } from "@adonisjs/http-server/build/src/Exceptions/HttpException";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Request = this.app.container.use("Adonis/Core/Request");
    Request.macro("zValidate", function (schema) {
      console.log(this.body());
      return schema.parse(this.body());
    });
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
