import { Model, Schema, Types } from 'mongoose';

import { TameColor } from './TamesColorsModel';
import { Tame } from './TamesModel';
import { Member } from './MembersModel';
import { Species } from './SpeciesModel';
import { Item } from './ItemsModel';

export type idRefTypes = (string | Types.ObjectId);
export type dataRefTypes<dataClass> = (string | Types.ObjectId | dataClass);
export type classRefType<classType> = (string|classType);

export type stats = {
  health: number
  stamina: number,
  oxygen: number,
  food: number,
  water: number,
  weight: number,
  melee: number,
}

export type addedLevels = {
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
type item<
  idType extends idRefTypes,
  oType extends dataRefTypes<Member>,
> = {
  _id: idType;
  type: string;
  name: string;
  level: string;
  durability: number;
  damage: number;
  owner: oType;
}

export type mongoItem = item<Types.ObjectId, Types.ObjectId>;
export type propItem = item<string, classRefType<Member>>;
export type dataItem = item<string, string>;
export type popPropItem = item<string, Member>;

// member types
export type memberStats = {
  current: stats;
  affinity: stats;
}

export type memberLevels = {
  current: number;
  max: number;
  added: addedLevels;
}

type member<
  idType extends idRefTypes,
  tType extends dataRefTypes<Tame>,
  iType extends dataRefTypes<Item>,
> = {
  _id: idType;
  name: string;
  world: string;
  lvl: memberLevels;
  stats: memberStats;
  tames: tType[];
  items: iType[];
}

export type mongoMember = member<Types.ObjectId, Types.ObjectId, Types.ObjectId>;
export type propMember = member<string, classRefType<Tame>, classRefType<Item>>;
export type dataMember = member<string, string, string>;
export type popPropMember = member<string, Tame, Item>;

// species
type species<idType extends idRefTypes> = {
  _id: idType;
  name: string;
  diet: string;
  temperament: string;
  tamable: boolean;
  ridable: boolean;
  breedable: boolean;
}

export type mongoSpecies = species<Types.ObjectId>;
export type propSpecies = species<string>;

// Tame Colors
type tameColor<T extends idRefTypes> = {
  "_id": T,
  color: string,
  hex: string,
  colorID: number,
}

export type mongoColor = tameColor<Types.ObjectId>;
export type propColor = tameColor<string>;

// tame types
export type tameStats = {
  starting: stats;
  current: stats;
  affinity: stats;
}

export type tameLevels = {
  wild?: number;
  tamed: number;
  max: number;
  added: addedLevels;
}

type parents<type extends dataRefTypes<Tame>> = {
  father?: type,
  mother?: type,
}

export type mongoParents = parents<Types.ObjectId>
export type propParents = parents<classRefType<Tame>>
export type dataParents = parents<string>
export type popPropParents = parents<Tame>
 
export type sex = "M" | "F";

export type age = "Baby" | "Juvenile" | "Adolescence" | "Adult";

type tame<
  idType extends idRefTypes,
  oType extends dataRefTypes<Member>,
  pType extends dataRefTypes<Tame>,
  sType extends dataRefTypes<Species>,
  cType extends dataRefTypes<TameColor>,
> = {
  _id?: idType
  name: string,
  age: age,
  sex: sex,
  owner: oType,
  wild: boolean,
  breed: boolean,
  lvl: tameLevels,
  parents: parents<pType>,
  stats: tameStats,
  deseased: boolean,
  nutered: boolean,
  species: sType,
  colors: cType[],
}

export type mongoTame = tame<Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId, Types.ObjectId>;
export type propTame = tame<string, classRefType<Member>, classRefType<Tame>, classRefType<Species>, classRefType<TameColor>>;
export type dataTame = tame<string, string, string, string, string>;
export type popPropTame = tame<string, Member, Tame, Species, TameColor>;