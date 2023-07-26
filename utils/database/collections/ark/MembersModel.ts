import type { Types } from "mongoose";
import type { memberLevels, memberStats, member, stats, addedLevels } from "./types";

import { Schema, model, models } from "mongoose";

export class Member implements member<string, string> {
  public _id!: string;
  public name!: string;
  public world!: string;
  public lvl!: memberLevels;
  public stats!: memberStats;
  public tames!: string[];

  constructor(member: member<Types.ObjectId, Types.ObjectId>) {
    const { _id, name, world, lvl, stats, tames } = member;
    this._id = _id.toString();
    this.name = name;
    this.world = world;
    this.lvl = lvl;
    this.stats = stats;
    this.tames = tames.map((tame) => tame.toString());
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

  private static membersSchema = new Schema<member<Types.ObjectId, Types.ObjectId>>({
    name: String,
    world: String,
    lvl: this.memberLevelsSchema,
    stats: this.memberStatsSchema,
    tames: { type: [Schema.Types.ObjectId], ref: 'tames' }
  });

  private static membersModel = models['members'] ?? model<member<Types.ObjectId, Types.ObjectId>>('members', this.membersSchema);

  static convertMember(member: member<Types.ObjectId, Types.ObjectId>): Member  {
    return new Member(member);
  }

  static async findAll(): Promise<Member[]> {
    return (await this.membersModel.find().lean()).map((member: member<Types.ObjectId, Types.ObjectId>) => this.convertMember(member));
  }

  static async findOne(id: string) {
    return (await this.membersModel.findById(id).lean()).then((member: member<Types.ObjectId, Types.ObjectId>) => this.convertMember(member));
  }

  static async findList(idList: string[]): Promise<Member[]> {
    const members: Member[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      members.push(await this.findOne(idList[i]));
    }
    return members;
  }
}