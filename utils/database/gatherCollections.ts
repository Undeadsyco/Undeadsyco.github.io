import type { ConnectOptions } from 'mongoose';

import { connect } from 'mongoose';
import { TamesController, MembersController, ItemsController, TamesColorsController, SpeciesController } from './collections/ark';

export async function createConnection(database: string) {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('Add Mongo URI to .env.local')
  }

  return await connect(uri as string, { useUnifiedTopology: true, dbName: database } as ConnectOptions)
    .then((connect) => {
      if (connect) return true;
    }).catch(err => {
      return false;
    });
}

async function getArkCollections() {
  return JSON.stringify({
    colors: await TamesColorsController.findAll(),
    tames: await TamesController.findAll(),
    members: await MembersController.findAll(),
    items: await ItemsController.findAll(),
    species: await SpeciesController.findAll(),
  });
}

export async function gatherCollections(database: string) {
  switch (database) {
    case 'ark': {
      return await getArkCollections();
    }
  }
}