import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";
import mtgDB from "../../connections/MtgDBConnect";
import { CustomCard } from "./cards";

export interface ISet {
  _id?: IDType;
  name: string;
  code: string;
  cards: IDType[] | CustomCard[]
}

export default class SetController {
  public static model = models?.Set
    || model<ISet>("Set", new Schema<ISet>({
      name: { type: String, required: true },
      code: { type: String, required: true },
      cards: [{ type: Schema.Types.ObjectId, ref: "Card", required: true }]
    }));

  public static isCard = (card: any): card is CustomCard => (
    "_id" in card
  );

  public static strigifyIds = (sets: ISet[]) => sets.map(set => ({
    ...set,
    _id: set._id?.toString(),
    cards: set.cards.map(card => this.isCard(card) ? { ...card, _id: card._id?.toString() } : card.toString())
  }));

  public static async create(set: ISet): Promise<ISet> {
    await mtgDB();

    return await this.model.create(set);
  }

  public static async getAll(set?: { [K in keyof ISet]?: ISet[K] }) {
    await mtgDB();
    if (set) return this.strigifyIds(await this.model.find(set).lean());
    return this.strigifyIds(await this.model.find().lean());
  }

  public static async getOne(set: { [K in keyof ISet]?: ISet[K] }) {
    await mtgDB();
    return await this.model.findOne(set);
  }

  public static async addCard(setId: IDType, cardId: IDType) {
    await mtgDB();
    return await this.model.findByIdAndUpdate(setId, { $push: { cards: cardId } })
  }
}