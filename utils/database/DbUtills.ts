import { createConnection, gatherCollections } from './gatherCollections';

export default async function getData(database: string) {
  try {
    if (await createConnection(database)) return await gatherCollections(database);
  } catch (err: any) {
    console.log(err)
  }
}