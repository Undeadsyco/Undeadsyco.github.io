import type { NextApiRequest, NextApiResponse } from "next";
import * as Magic from "mtgsdk-ts";
import { Card, CreatureCard, PlaneswalkerCard } from "mtgsdk-ts/out/IMagic";
import CardController, { ICard } from "../../../../lib/collections/mtg/cards";
import { IDType } from "../../../../types";

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: Card | (Card & CreatureCard) | (Card & PlaneswalkerCard) = req.body.card;

  const card: ICard = await CardController.getOne({ name: data.name })

  if (!card) {
    const newCard = CardController.create({
      set: data.setName,
      name: data.name,
      imageUrl: data.imageUrl,
      rarity: data.rarity,
      type: data.types[0],
      subTypes: data.subtypes,
      manaCost: data.manaCost,
      colors: data.colors,
      text: data.originalText,
      power: parseInt((data as (Card & CreatureCard)).power) || 0,
      toughness: parseInt((data as (Card & CreatureCard)).toughness) || 0,
      loyalty: (data as (Card & PlaneswalkerCard)).loyalty || 0,
      copies: 1,
    });

    if (!newCard) res.status(424).end("was unable to create new card");
    else res.status(201).end("new card created");
  } else {
    const cardUpdate = await CardController.addCopy(card._id as IDType, card.copies);
    if (!cardUpdate) res.status(409).end("unable to update number of coppies on card");
    else res.status(204).end("Updated Card Copies")
  }
}