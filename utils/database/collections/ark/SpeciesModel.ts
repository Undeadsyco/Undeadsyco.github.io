import type { mongoSpecies, propSpecies } from "./types";

import { Schema, model, models } from "mongoose";

export class Species implements propSpecies {
  public _id!: string;
  public name!: string;
  public diet!: string;
  public temperament!: string;
  public tamable!: boolean;
  public ridable!: boolean;
  public breedable!: boolean;

  constructor(species: mongoSpecies) {
    const { _id, name, diet, temperament, tamable, ridable, breedable } = species;
    this._id = _id.toString();
    this.name = name;
    this.diet = diet;
    this.temperament = temperament;
    this.tamable = tamable;
    this.ridable = ridable;
    this.breedable = breedable;
  }
}

export default class Controller {
  private static speciesSchema = new Schema<mongoSpecies>({
    name: String,
    diet: String,
    temperament: String,
    tamable: Boolean,
    ridable: Boolean,
    breedable: Boolean,
  });
  private static speciesModel = models['species'] ?? model<mongoSpecies>('species', this.speciesSchema);

  static convertSpecies(species: mongoSpecies): Species {
    return new Species(species);
  }

  static async findAll(): Promise<Species[]> {
    return (await this.speciesModel.find().lean()).map((species) => this.convertSpecies(species))
  }

  static async findOne(id: string): Promise<Species> {
    return (await this.speciesModel.findById(id).lean()).then((species: mongoSpecies) => this.convertSpecies(species));
  }

  static async findList(idList: string[]): Promise<Species[]> {
    const species: Species[] = [];
    for (let i = 0; i < idList.length; i += 1) {
      species.push(await this.findOne(idList[i]));
    }
    return species;
  }
}