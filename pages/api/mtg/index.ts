import type { NextApiRequest, NextApiResponse } from "next";
import * as Magic from "mtgsdk-ts";

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ cards: (await Magic.Cards.where({ name: req.query.name as string, contains: "imageUrl" })) });
}