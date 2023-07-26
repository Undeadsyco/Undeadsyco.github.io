import type { tame, tameLevels, tameStats, age, sex, parents, stats, addedLevels, memberStats, memberLevels } from "./types";
import { Types } from "mongoose";

import { Schema, model, models } from "mongoose";

export class Tame implements tame<string, string, string, string, string> {
  public _id!: string;
  public name!: string;
  public age!: age;
  public sex!: sex;
  public owner!: string;
  public wild!: boolean;
  public born!: boolean;
  public lvl!: tameLevels;
  public parents!: parents<string>;
  public stats!: tameStats;
  public deseased!: boolean;
  public nutered!: boolean;
  public species!: string;
  public colors!: string[];

  constructor(tame: tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>) {
    const { _id, name, age, sex, owner, wild, born, lvl, parents, stats, deseased, nutered, species, colors } = tame;
    const { current, starting, affinity } = stats;
    const { wild: wildLvl, tamed, max, added } = lvl;

    this._id = _id.toString();
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.owner = owner.toString()
    this.wild = wild;
    this.born = born;
    this.lvl = {
      wild: wildLvl,
      tamed,
      max,
      added: this.convertLvls(added)
    };
    this.parents = {
      mother: parents?.mother?.toString() ?? undefined,
      father: parents?.father?.toString() ?? undefined,
    }
    this.stats = {
      starting: this.convertStats(starting),
      current: this.convertStats(current),
      affinity: this.convertStats(affinity),
    };
    this.deseased = deseased;
    this.nutered = nutered;
    this.species = species.toString();
    this.colors = colors?.map((color) => color.toString());
  }

  private convertStats(stats: stats) {
    const { health, stamina, oxygen, food, water, weight, melee } = stats;
    return ({
      health,
      stamina,
      oxygen,
      food,
      water,
      weight,
      melee,
    });
  }

  private convertLvls(lvls: addedLevels) {
    const { total, health, stamina, oxygen, food, water, weight, melee } = lvls;
    return ({
      total,
      health,
      stamina,
      oxygen,
      food,
      water,
      weight,
      melee,
    });
  }
}

class Controller {
  private static statSchema = new Schema<stats>({
    health: {
      type: Number,
      populate: 0
    },
    stamina: {
      type: Number,
      populate: 0
    },
    oxygen: {
      type: Number,
      populate: 0
    },
    food: {
      type: Number,
      populate: 0
    },
    water: {
      type: Number,
      populate: 0
    },
    weight: {
      type: Number,
      populate: 0
    },
    melee: {
      type: Number,
      populate: 0
    },
  }, { _id: false });

  private static addedLvlsSchema = new Schema<addedLevels>({
    total: Number,
    health: Number,
    stamina: Number,
    oxygen: Number,
    food: Number,
    water: Number,
    weight: Number,
    melee: Number,
  }, { _id: false });

  private static tameStatsSchema = new Schema<tameStats>({
    starting: this.statSchema,
    current: this.statSchema,
    affinity: this.statSchema,
  }, { _id: false });

  private static tameLvlSchema = new Schema<tameLevels>({
    wild: Number,
    tamed: Number,
    max: Number,
    added: this.addedLvlsSchema
  }, { _id: false });

  private static tameParentsSchema = new Schema<parents<Types.ObjectId>>({
    father: Schema.Types.ObjectId,
    mother: Schema.Types.ObjectId,
  }, { _id: false });

  private static tamesSchema = new Schema<tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>>({
    name: String,
    age: { type: String, enum: ['Baby', 'Juvenile', 'Adolescence', 'Adult'], },
    sex: { type: String, enum: ["M", "F"] },
    owner: { type: Schema.Types.ObjectId, ref: 'members' },
    wild: { type: Boolean, populate: 'true' },
    born: { type: Boolean, populate: 'false' },
    lvl: this.tameLvlSchema,
    parents: this.tameParentsSchema,
    stats: this.tameStatsSchema,
    deseased: Boolean,
    nutered: Boolean,
    species: { type: Schema.Types.ObjectId, ref: 'species' },
    colors: { type: [Schema.Types.ObjectId], ref: "colors" },
  });

  private static tameModel = models['tames'] ?? model<tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>>('tames', this.tamesSchema);

  static convertTame(tame: tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>) {
    return new Tame(tame)
  }

  static async findAll(): Promise<Tame[]> {
    return ((
      await this.tameModel.find().lean()
    ).map(
      (tame: tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>) => this.convertTame(tame)
    ));
  }

  static async findOne(id: string): Promise<Tame> {
    return ((
      await this.tameModel.findById(id).lean()
    ).then(
      (tame: tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>) => this.convertTame(tame)
    ))
  }

  static async findList(idList: string[]): Promise<Tame[]> {
    const tames: Tame[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      tames.push(await this.findOne(idList[i]));
    }
    return tames;
  }
}

export default Controller;

