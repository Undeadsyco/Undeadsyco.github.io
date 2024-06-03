import type { NextApiRequest, NextApiResponse } from "next";
import * as Magic from "mtgsdk-ts";
import { Card } from "mtgsdk-ts/out/IMagic";

type Data = {
 cards: Card[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ cards: (await Magic.Cards.where({ name: req.query.name as string, contains: "imageUrl" })) });
}