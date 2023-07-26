import type { ConnectOptions } from 'mongoose';

import { connect, connection, } from 'mongoose';
import { TamesController } from './collections/ark';


const uri = process.env.MONGO_URI;

if (!uri) {
  console.log('mongo uri', uri);
  throw new Error('Add Mongo URI to .env.local')
}

async function getArkCollections() {
  return JSON.stringify({ tames: await TamesController.getAll() });
}

export default async function getData(database: string, collections?: string[]) {
  try {
    connect(uri as string, { useUnifiedTopology: true, dbName: database } as ConnectOptions).then((connect) => {
      if (connect) console.log(connection.db.databaseName);
    }).catch(err => {
      console.log(err)
    });

    switch (database) {
      case 'ark': {
        return getArkCollections();
      }
    }
  } catch (err: any) {
    console.log(err)
  }
}