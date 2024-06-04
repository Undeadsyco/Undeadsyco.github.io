import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";
import mtgDB from "../../connections/MtgDBConnect";
import { CreatureCard, PlaneswalkerCard } from "mtgsdk-ts/out/IMagic";


export interface ICard {
  _id?: IDType;
  set: IDType | string;
  manaCost?: string;
  imageUrl?: string;
  name: string;
  rarity: string;
  type: string;
  subTypes: string[];
  colors: string[];
  text: string;
  copies: number;
}

export interface ICreatureCard extends ICard {
  power: number;
  toughness: number;
}

export interface IPlaneswalkerCard extends ICard {
  loyalty: number;
}

export type CustomCard = (ICard | ICreatureCard | IPlaneswalkerCard);

export default class CardController {
  public static model = models?.Card
    ?? model<ICard | ICreatureCard | IPlaneswalkerCard>(
      "Card",
      new Schema<ICard | ICreatureCard | IPlaneswalkerCard>({
        name: { type: String, required: true },
        set: { type: Schema.Types.ObjectId, ref: "Set", required: true },
        imageUrl: { type: String },
        rarity: { type: String, enum: ["Common", "Uncommon", "Rare", "Mythic", "Special", "Basic Land"], required: true },
        type: { type: String, enum: ["Instant", "Sorcery", "Artifact", "Creature", "Enchantment", "Land", "Planeswalker"], required: true },
        subTypes: [{ type: String, required: true }],
        manaCost: {
          type: String,
          required: function () {
            return (this.type !== "Basic Land")
          }
        },
        colors: [{ type: String, enum: ["B", "W", "R", "G", "U"] }],
        text: { type: String },
        power: {
          type: Number,
          required: function () {
            return (this.type === "Creature")
          }
        },
        toughness: {
          type: Number,
          required: function () {
            return this.type === "Creature"
          },
        },
        loyalty: {
          type: Number,
          required: function () {
            return this.type === "Planeswalker"
          }
        },
        copies: { type: Number, required: true, default: 1 },
      })
    );

  public static isCreature = (card: any): card is ICreatureCard => (
    ("power" && "toughness") in card
  );

  public static isPlaneswalker = (card: any): card is IPlaneswalkerCard => (
    "loyalty" in card
  );

  public static stringifyIds = (cards: CustomCard[]) => (cards.map(card => ({
    ...card,
    _id: card._id?.toString(),
    set: card.set.toString(),
  })))

  public static async create(card: CustomCard) {
    await mtgDB();
    return await this.model.create(card);
  }

  public static async getAll(card?: { [K in keyof CustomCard]?: CustomCard[K] }) {
    await mtgDB();
    if (card) return this.stringifyIds((await this.model.find(card).lean()));
    return this.stringifyIds(await this.model.find().lean());
  }

  public static async getOne(card: { [K in keyof CustomCard]?: CustomCard[K] }) {
    await mtgDB();
    return await this.model.findOne(card);
  }

  public static async addCopy(id: IDType, copies: number) {
    await mtgDB();
    return await this.model.findByIdAndUpdate(id, { copies: copies + 1 })
  }
}