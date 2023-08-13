import axios from "axios";
import type { tameStats, stats, addedLevels, tameLevels, dataParents, sex, age, dataTame } from "../../utils/database/collections/ark/types";

import { useFormik } from "formik";
import { object, ObjectSchema, string, number, bool, StringSchema, array, Maybe, AnyObject, AnySchema } from 'yup';

export type statType = ('starting' | 'current' | 'affinity');

export type statsForm = {
  stats: stats;
  statType: string;
}

const useTameForm = () => {
  const initialStats = {
    health: 0,
    stamina: 0,
    oxygen: 0,
    food: 0,
    water: 0,
    weight: 0,
    melee: 0,
  }

  const initValues: dataTame = {
    '_id': '',
    name: '',
    age: 'Adult',
    sex: 'F',
    owner: '',
    tamed: true,
    breed: false,
    lvl: {
      wild: 0,
      tamed: 0,
      max: 0,
      added: {
        total: 0,
        ...initialStats
      }
    },
    parents: {},
    stats: {
      starting: initialStats,
      current: initialStats,
      affinity: initialStats,
    },
    deseased: false,
    nutered: false,
    species: '',
    colors: [],
  }

  /** stats */
  const statsValSchema: ObjectSchema<stats> = object({
    health: number().required().default(0),
    stamina: number().required().default(0),
    oxygen: number().required().default(0),
    food: number().required().default(0),
    water: number().required().default(0),
    weight: number().required().default(0),
    melee: number().required().default(0),
  });

  const tameStatsValSchema: ObjectSchema<tameStats> = object({
    starting: statsValSchema,
    current: statsValSchema,
    affinity: statsValSchema,
  });

  /** Levels */
  const addedLvlsValSchema: ObjectSchema<addedLevels> = statsValSchema.shape({
    total: number().required().default(0).min(0).max(88),
  });

  const tameLvlValSchema: ObjectSchema<tameLevels> = object({
    wild: number().optional().default(5),
    tamed: number().required().default(7),
    max: number().required().default(95),
    added: addedLvlsValSchema,
  });

  /** parents */
  const parentsValSchema: ObjectSchema<dataParents> = object({
    mother: string().optional(),
    father: string().optional(),
  });

  const tameValSchema: ObjectSchema<dataTame> = object({
    '_id': string().optional(),
    name: string().required().default(''),
    age: string<age>().required().default('Adult'),
    sex: string<sex>().required().default('F'),
    owner: string().required().default(''),
    tamed: bool().required().default(true),
    breed: bool().required().default(false),
    lvl: tameLvlValSchema,
    parents: parentsValSchema,
    stats: tameStatsValSchema,
    deseased: bool().required().default(false),
    nutered: bool().required().default(false),
    species: string().required().default(''),
    colors: array<StringSchema, string>().required().default([] as string[]),
  });

  const tameFormik = useFormik({
    validationSchema: tameValSchema,
    initialValues: initValues,
    onSubmit: (values, actions) => {
      axios.post('http://localhost:3000/api/ark/tames', values);
      actions.resetForm();
    },
  })

  return ({ tameFormik, initValues })
}

export default useTameForm;