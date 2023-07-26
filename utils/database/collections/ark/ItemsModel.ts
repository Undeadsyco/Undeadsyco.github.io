import type { Types } from "mongoose";
import type { item } from "./types";

import { Schema, model, models } from "mongoose";

export class Item implements item<string, string> {
  public _id!: string;
  public type: string;
  public name: string;
  public level: string;
  public durability: number;
  public damage: number;
  public owner: string;

  constructor(item: item<Types.ObjectId, Types.ObjectId>) {
    const { _id, type, name, level, durability, damage, owner } = item;
    this._id = _id.toString();
    this.type = type;
    this.name = name;
    this.level = level;
    this.durability = durability;
    this.damage = damage;
    this.owner = owner.toString();
  }
}

export default class Controller {
  private static itemsSchema = new Schema<item<Types.ObjectId, Types.ObjectId>>({
    type: { Type: String },
    name: String,
    level: String,
    durability: Number,
    damage: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'item' }
  });

  private static itemsModel = models['items'] ?? model<item<Types.ObjectId, Types.ObjectId>>('items', this.itemsSchema);

  static convertItem(item: item<Types.ObjectId, Types.ObjectId>): Item {
    return new Item(item);
  }

  static async findAll(): Promise<Item[]> {
    return (await this.itemsModel.find().lean()).map((item: item<Types.ObjectId, Types.ObjectId>) => this.convertItem(item));
  }

  static async findOne(id: string): Promise<Item> {
    return (await this.itemsModel.findById(id).lean()).then((item: item<Types.ObjectId, Types.ObjectId>) => this.convertItem(item))
  }

  static async findList(idList: string[]): Promise<Item[]> {
    const items: Item[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      items.push(await this.findOne(idList[i]));
    }
    return items;
  }
}