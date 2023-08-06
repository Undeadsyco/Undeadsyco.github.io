import type { 
  tameLevels, tameStats, age, sex, stats, addedLevels, classRefType, propTame, mongoTame, mongoParents, propParents, popPropTame, dataTame 
} from "./types";

import { Schema, model, models } from "mongoose";
import { Member } from "./MembersModel";
import { Species } from "./SpeciesModel";
import { TameColor } from "./TamesColorsModel";

type populateOpts = {
  owner?: Member;
  parents?: {
    mother: Tame;
    father: Tame;
  }
  species?: Species;
  colors?: TameColor[];
}

export class Tame implements propTame {
  public _id!: string;
  public name!: string;
  public age!: age;
  public sex!: sex;
  public owner!: classRefType<Member>;
  public wild!: boolean;
  public breed!: boolean;
  public lvl!: tameLevels;
  public parents!: propParents;
  public stats!: tameStats;
  public deseased!: boolean;
  public nutered!: boolean;
  public species!: classRefType<Species>;
  public colors!: classRefType<TameColor>[];

  constructor(tame: mongoTame) {
    const { _id, name, age, sex, owner, wild, breed, lvl, parents, stats, deseased, nutered, species, colors } = tame;
    const { current, starting, affinity } = stats;
    const { wild: wildLvl, tamed, max, added } = lvl;

    this._id = _id!.toString();
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.owner = owner.toString()
    this.wild = wild;
    this.breed = breed;
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

  public populte({ owner, parents, species, colors }: populateOpts): popPropTame {
    if (owner) this.owner = owner;
    if (parents) this.parents = parents;
    if (species) this.species = species;
    if (colors) this.colors = colors;
    return this as popPropTame
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

  private static tameParentsSchema = new Schema<mongoParents>({
    father: Schema.Types.ObjectId,
    mother: Schema.Types.ObjectId,
  }, { _id: false });

  private static tamesSchema = new Schema<mongoTame>({
    name: String,
    age: { type: String, enum: ['Baby', 'Juvenile', 'Adolescence', 'Adult'], },
    sex: { type: String, enum: ["M", "F"] },
    owner: { type: Schema.Types.ObjectId, ref: 'members' },
    wild: { type: Boolean, populate: 'true' },
    breed: { type: Boolean, populate: 'false' },
    lvl: this.tameLvlSchema,
    parents: this.tameParentsSchema,
    stats: this.tameStatsSchema,
    deseased: Boolean,
    nutered: Boolean,
    species: { type: Schema.Types.ObjectId, ref: 'species' },
    colors: { type: [Schema.Types.ObjectId], ref: "colors" },
  });

  private static model = models['tames'] ?? model<mongoTame>('tames', this.tamesSchema);

  static convertTame(tame: mongoTame) {
    return new Tame(tame)
  }

  static async findAll(): Promise<Tame[]> {
    return ((
      await this.model.find().lean()
    ).map(
      (tame: mongoTame) => this.convertTame(tame)
    ));
  }

  static async findOne(id: string): Promise<Tame> {
    return ((
      await this.model.findById(id).lean()
    ).then(
      (tame: mongoTame) => this.convertTame(tame)
    ))
  }

  static async findList(idList: string[]): Promise<Tame[]> {
    const tames: Tame[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      tames.push(await this.findOne(idList[i]));
    }
    return tames;
  }

  static async createNew(tame: dataTame) {
    delete tame._id
    await this.model.create(tame);
    return;
  }
}

export default Controller;

