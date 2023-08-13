import type { NextApiRequest, NextApiResponse } from 'next';

import { TamesController } from '../../../utils/database/collections/ark';

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('method', req.method)  
  switch (req.method) {
    default: {
      res.status(200).json({ status: 'success' });
      break;
    }
  }
}
