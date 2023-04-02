import { Collection, MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.log('mongo uri', uri);
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

function convertTamesData(tames: any[]) {
  // console.log('tames', tames)
  return tames.map((tame: any) => ({
    id: tame._id.toString(),
    name: tame.name,
    species: tame.creature,
    tamed_status: tame.wild ? 'wild' : 'born',
    sex: tame.sex,
    lvl: {
      wild: tame.wild ? tame.lvl.wild : null,
      tamed: tame.lvl.tamed,
      max: tame.lvl.max,
    },
    parents: tame.born ? {
      mother: tame.parents.mother.name,
      father: tame.parents.father.name,
    } : null,
    stats: tame.stats,
    affinity: tame.affinity,
    deceased: tame.deseased,
    nutered: tame.nutered,
  }));
}

function convertData(collection: string, data: any[]) {
  switch (collection) {
    case "members":
      return;
    case "tames":
      return convertTamesData(data);
    case "items":
      return;
    default:
      return;
  }
}

export default async function getData(database: string, collection: string) {
  try {
    const client = await clientPromise;
    const data = await client.db(database).collection(collection).aggregate([
      {
        "$lookup": {
          from: "tames",
          localField: "parents.Mother",
          foreignField: "_id",
          as: "parents.mother"
        },
      },
      {
        "$unwind": {
          path: '$parents.mother',
          preserveNullAndEmptyArrays: true
        },
      },
      {
        "$lookup": {
          from: 'tames',
          localField: 'parents.father',
          foreignField: '_id',
          as: 'parents.father'
        },
      },
      {
        "$unwind": {
          path: '$parents.father',
          preserveNullAndEmptyArrays: true
        }
      }
    ]).toArray();
    return convertData(collection, data);
  } catch (err: any) {
    console.log(err.message)
  }
}