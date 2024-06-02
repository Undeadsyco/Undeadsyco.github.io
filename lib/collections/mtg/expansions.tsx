import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";
import { ISet } from "./sets";

export interface IExpansion {
  _id?: IDType;
  set: IDType | ISet;
  name: string;
  imageUrl: string;
}

export default class ExpansionController {
  public static model = models?.Expansion || model<IExpansion>("Expansion", new Schema<IExpansion>({
    set: { type: Schema.Types.ObjectId, ref: "Set", required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
  }));

  public static async create({ set, name, imageUrl }: IExpansion): Promise<IExpansion> {
    await mtgDB();

    return await this.model.create({ set, name, imageUrl });
  }

  public static async getAll(expansion?: IExpansion) {
    await mtgDB();

    if (expansion) return await this.model.find({ name: expansion.name });
    return await this.model.find();
  }

  public static async getOne(expansion: IExpansion) {
    await mtgDB();

    return await this.model.findOne({ name: expansion.name });
  }

  public static async getById(id: IDType): Promise<IExpansion | null> {
    await mtgDB();

    return await this.model.findById(id);
  }
}