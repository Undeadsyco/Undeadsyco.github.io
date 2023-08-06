import type { NextApiRequest, NextApiResponse } from 'next';

import { TamesController } from '../../../../utils/database/collections/ark';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('method', req.method)  
  switch (req.method) {
    case 'POST': {
      await TamesController.createNew(req.body);
      res.end();
      break;
    }
    default: {
      res.status(200).json({ name: 'John Doe' });
      break;
    }
  }
}
