import type { mongoColor, propColor } from "./types";

import { Schema, model, models } from "mongoose";

export class TameColor implements propColor {
  public _id!: string;
  public color!: string;
  public hex!: string;
  public colorID!: number;

  constructor(tameColor: mongoColor) {
    const { _id, color, hex, colorID } = tameColor;
    this._id = _id.toString();
    this.color = color;
    this.hex = hex;
    this.colorID = colorID;
  }
}

export default class TameColorController {
  private static colorSchema = new Schema<mongoColor>({
    color: String,
    hex: String,
    colorID: Number,
  });

  private static colorModel = models['tame_colors'] ?? model<mongoColor>('tame_colors', this.colorSchema);

  static convertColor(color: mongoColor): TameColor {
    return new TameColor(color)
  }

  static async findAll(): Promise<TameColor[]> {
    return await this.colorModel.find();
  }

  static async findOne(id: number): Promise<TameColor | null> {
    return await this.colorModel.findOne({ colorID: id });
  }

  static async findList(idList: number[]): Promise<TameColor[]> {
    const colors = [];
    for (let i = 0; i < idList.length; i += 1) {
      const color = await this.findOne(idList[i]);
      if (color) colors.push(color);
    }
    return colors;
  }
}
