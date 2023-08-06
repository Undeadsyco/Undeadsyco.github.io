import type { propItem, mongoItem, classRefType, popPropItem } from "./types";

import { Schema, model, models } from "mongoose";
import { Member } from "./MembersModel";

export class Item implements propItem {
  public _id!: string;
  public type: string;
  public name: string;
  public level: string;
  public durability: number;
  public damage: number;
  public owner: classRefType<Member>;

  constructor(item: mongoItem) {
    const { _id, type, name, level, durability, damage, owner } = item;
    this._id = _id.toString();
    this.type = type;
    this.name = name;
    this.level = level;
    this.durability = durability;
    this.damage = damage;
    this.owner = owner.toString();
  }

  public populate(owner: Member): popPropItem {
    this.owner = owner;
    return this as popPropItem;
  }
}

export default class Controller {
  private static itemsSchema = new Schema<mongoItem>({
    type: { Type: String },
    name: String,
    level: String,
    durability: Number,
    damage: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'item' }
  });

  private static itemsModel = models['items'] ?? model<mongoItem>('items', this.itemsSchema);

  static convertItem(item: mongoItem): Item {
    return new Item(item);
  }

  static async findAll(): Promise<Item[]> {
    return (await this.itemsModel.find().lean()).map((item: mongoItem) => this.convertItem(item));
  }

  static async findOne(id: string): Promise<Item> {
    return (await this.itemsModel.findById(id).lean()).then((item: mongoItem) => this.convertItem(item))
  }

  static async findList(idList: string[]): Promise<Item[]> {
    const items: Item[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      items.push(await this.findOne(idList[i]));
    }
    return items;
  }
}