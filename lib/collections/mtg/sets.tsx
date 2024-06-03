import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";
import mtgDB from "../../connections/MtgDBConnect";
import { ICard } from "./cards";

export interface ISet {
  _id?: IDType;
  name: string;
  code: string;
  cards: IDType[] | ICard[]
}

export default class SetController {
  public static model = models?.Set || model<ISet>("Set", new Schema<ISet>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: "Card", required: true }]
  }));

  public static async create(set: ISet): Promise<ISet> {
    await mtgDB();

    return await this.model.create(set);
  }

  public static async getAll(set?: ISet) {
    await mtgDB();
    if (set) return await this.model.find({ name: set.name, code: set.code });
    return await this.model.find().lean();
  }

  public static async getOne(set: { [K in keyof ISet]?: ISet[K] }) {
    await mtgDB();
    return await this.model.findOne({ name: set.name });
  }

  public static async addCard(setId: IDType, cardId: IDType) {
    await mtgDB();
    return await this.model.findByIdAndUpdate(setId, { $push: { cards: cardId } })
  }
}