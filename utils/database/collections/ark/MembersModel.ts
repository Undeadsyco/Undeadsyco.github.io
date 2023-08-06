import type { memberLevels, memberStats, stats, addedLevels, classRefType, propMember, mongoMember, popPropMember } from "./types";

import { Schema, model, models } from "mongoose";
import { Item } from "./ItemsModel";
import { Tame } from "./TamesModel";

type populateOpts = {
  tames: Tame[];
  items: Item[];
}

export class Member implements propMember {
  public _id!: string;
  public name!: string;
  public world!: string;
  public lvl!: memberLevels;
  public stats!: memberStats;
  public tames!: classRefType<Tame>[];
  public items!: classRefType<Item>[];

  constructor(member: mongoMember) {
    const { _id, name, world, lvl, stats, tames, items } = member;
    this._id = _id.toString();
    this.name = name;
    this.world = world;
    this.lvl = {
      max: lvl.max,
      current: lvl.current,
      added: this.convertLvls(lvl.added),
    };
    this.stats = {
      current: this.convertStats(stats.current),
      affinity: this.convertStats(stats.affinity),
    };
    this.tames = tames.map((tame) => tame.toString());
    this.items = items.map((item) => item.toString());
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

  public populte({ tames, items }: populateOpts): popPropMember {
    if (tames) this.tames = tames;
    if (items) this.items = items;
    return (this as popPropMember);
  }
}

export default class Controller {
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

  private static memberStatsSchema = new Schema<memberStats>({
    current: this.statSchema,
    affinity: this.statSchema,
  }, { _id: false });

  private static memberLevelsSchema = new Schema<memberLevels>({
    current: Number,
    max: Number,
    added: this.addedLvlsSchema,
  }, { _id: false });

  private static membersSchema = new Schema<mongoMember>({
    name: String,
    world: String,
    lvl: this.memberLevelsSchema,
    stats: this.memberStatsSchema,
    tames: { type: [Schema.Types.ObjectId], ref: 'tames' },
    items: { type: [Schema.Types.ObjectId], ref: 'items' },
  });

  private static membersModel = models['members'] ?? model<mongoMember>('members', this.membersSchema);

  static convertMember(member: mongoMember): Member  {
    return new Member(member);
  }

  static async findAll(): Promise<Member[]> {
    return (await this.membersModel.find().lean()).map((member: mongoMember) => this.convertMember(member));
  }

  static async findOne(id: string) {
    return (await this.membersModel.findById(id).lean()).then((member: mongoMember) => this.convertMember(member));
  }

  static async findList(idList: string[]): Promise<Member[]> {
    const members: Member[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      members.push(await this.findOne(idList[i]));
    }
    return members;
  }
}