import { DateTime } from "luxon";
import { BaseModel, column, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public completed: boolean;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
