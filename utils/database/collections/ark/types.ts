import { Model, Schema, Types } from 'mongoose';


export interface stats {
  health: number
  stamina: number,
  oxygen: number,
  food: number,
  water: number,
  weight: number,
  melee: number,
}

export interface addedLevels {
  total: number,
  health: number,
  stamina: number,
  oxygen: number,
  food: number,
  water: number,
  weight: number,
  melee: number,
}

//items
export interface item<
  idType extends Types.ObjectId | string,
  oType extends Types.ObjectId | string,
> {
  _id: idType;
  type: string;
  name: string;
  level: string;
  durability: number;
  damage: number;
  owner: oType;
}

// member types
export interface memberStats {
  current: stats;
  affinity: stats;
}

export interface memberLevels {
  current: number;
  max: number;
  added: addedLevels;
}

export interface member<
  idType extends Types.ObjectId | string,
  tType extends Types.ObjectId | string,
> {
  _id: idType;
  name: string;
  world: string;
  lvl: memberLevels;
  stats: memberStats;
  tames: tType[];
}

// species
export interface species<idType extends Types.ObjectId | string>  {
  _id: idType;
  name: string;
  diet: string;
  temperament: string;
  tamable: boolean;
  ridable: boolean;
  breedable: boolean;
}

// Tame Colors
export interface tameColor<T extends Types.ObjectId | string> {
  "_id": T,
  color: string,
  hex: string,
  colorID: number,
}

// tame types
export interface tameStats {
  starting: stats;
  current: stats;
  affinity: stats;
}

export interface tameLevels {
  wild: number | null;
  tamed: number;
  max: number;
  added: addedLevels;
}

export interface parents<type extends Types.ObjectId | string> {
  father: type,
  mother: type,
}

export type sex = "M" | "F";

export type age = "Baby" | "Juvenile" | "Adolescence" | "Adult";

export interface tame<
  idType extends Types.ObjectId | string,
  oType extends Types.ObjectId | string,
  pType extends Types.ObjectId | string,
  sType extends Types.ObjectId | string,
  cType extends Types.ObjectId | string,
> {
  _id: idType
  name: string,
  age: age,
  sex: sex,
  owner: oType,
  wild: boolean,
  born: boolean,
  lvl: tameLevels,
  parents: parents<pType>,
  stats: tameStats,
  deseased: boolean,
  nutered: boolean,
  species: sType,
  colors: cType[],
}