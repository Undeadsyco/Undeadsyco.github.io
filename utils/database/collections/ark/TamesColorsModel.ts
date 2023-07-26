import type { Types } from "mongoose";
import type { tameColor } from "./types";

import { Schema, model, models } from "mongoose";

export class TameColor implements tameColor<string> {
  public _id!: string;
  public color!: string;
  public hex!: string;
  public colorID!: number;

  constructor(tameColor: tameColor<Types.ObjectId>) {
    const { _id, color, hex, colorID } = tameColor;
    this._id = _id.toString();
    this.color = color;
    this.hex = hex;
    this.colorID = colorID;
  }
}

export default class TameColorController {
  private static colorSchema = new Schema<tameColor<Types.ObjectId>>({
    color: String,
    hex: String,
    colorID: Number,
  });

  private static colorModel = models['tame_colors'] ?? model<tameColor<Types.ObjectId>>('tame_colors', this.colorSchema);

  static convertColor(color: tameColor<Types.ObjectId>): TameColor {
    return new TameColor(color)
  }

  static async findAll(): Promise<TameColor[]> {
    return (await this.colorModel.find().lean()).map(this.convertColor);
  }

  static async findOne(id: number): Promise<TameColor> {
    return ((
      await this.colorModel.findOne({ colorID: id }).lean()
    ).then(
      (color: tameColor<Types.ObjectId>) => this.convertColor(color)
    ));
  }

  static async findList(idList: number[]): Promise<TameColor[]> {
    const colors = [];
    for (let i = 0; i < idList.length; i += 1) {
      colors.push(await this.findOne(idList[i]));
    }
    return colors;
  }
}
