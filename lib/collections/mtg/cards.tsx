import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";
import mtgDB from "../../connections/MtgDBConnect";


export interface ICard {
  _id?: IDType;
  set: string;
  name: string;
  imageUrl: string;
  rarity: string;
  type: string;
  subTypes: string[];
  manaCost: string;
  colors: string[];
  text: string;
  copies: number;

  power?: number;
  toughness?: number;

  loyalty?: number;
}

export default class CardController {
  public static model = models?.Card ?? model<ICard>("Card", new Schema<ICard>({
    name: { type: String, required: true },
    // set: { type: Schema.Types.ObjectId, ref: "Set", required: true },
    set: { type: String },
    imageUrl: { type: String, required: true },
    rarity: { type: String, enum: ["Common", "Uncommon", "Rare", "Mythic", "Special", "Basic Land"], required: true },
    type: { type: String, enum: ["Instant", "Sorcery", "Artifact", "Creature", "Enchantment", "Land", "Planeswalker"], required: true },
    subTypes: [{ type: String }],
    manaCost: { type: String, required: true },
    colors: [{ type: String, enum: ["B", "W", "R", "G", "U"] }],
    text: { type: String },
    power: { type: Number, required: false },
    toughness: { type: Number, required: false },
    loyalty: { type: Number, required: false },
    copies: { type: Number, required: true },
  }));

  public static async create(card: ICard) {
    await mtgDB();
    return await this.model.create(card);
  }

  public static async getAll(card?: { [K in keyof ICard]?: ICard[K] }) {
    await mtgDB();
    if (card) return await this.model.find({ name: card.name });
    return await this.model.find();
  }

  public static async getOne(card: { [K in keyof ICard]?: ICard[K] }) {
    await mtgDB();
    return await this.model.findOne({ name: card.name });
  }

  public static async addCopy(id: IDType, copies: number) {
    await mtgDB();
    return await this.model.findByIdAndUpdate(id, { copies: copies + 1 })
  }
}