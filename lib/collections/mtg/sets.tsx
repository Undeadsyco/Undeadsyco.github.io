import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";

export interface ISet {
  _id?: IDType;
  name: string;
  imageUrl: string;
  expansions: IDType[];
}

export default class SetController {
  public static model = models?.Set || model<ISet>("Set", new Schema<ISet>({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    expansions: [{ type: Schema.Types.ObjectId, ref: "Expansion" }],
  }));

  public static async create({ name, imageUrl }: ISet): Promise<ISet> {
    await mtgDB();

    return await this.model.create({ name, imageUrl, expansions: [] });
  }

  public static async getAll(set?: ISet) {
    await mtgDB();

    if (set) return await this.model.find({ name: set.name });
    return await this.model.find();
  }

  public static async getOne(set: ISet) {
    await mtgDB();

    return await this.model.findOne({ name: set.name });
  }

  public static async getById(id: IDType): Promise<ISet | null> {
    await mtgDB();

    return await this.model.findById(id);
  }
}