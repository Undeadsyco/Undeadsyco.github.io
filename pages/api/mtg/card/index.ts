// dependencies
import { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from "next";
// controllers
import CardController, { ICard } from "../../../../lib/collections/mtg/cards";
import SetController from "../../../../lib/collections/mtg/sets";
// types
import type { Card, CreatureCard, PlaneswalkerCard } from "mtgsdk-ts/out/IMagic";
import type { IDType } from "../../../../types";

type Data = {

}

const isCreature = (card: any): card is CreatureCard => (
  ("power" && "toughness") in card
);

const isPlaneswalker = (card: any): card is PlaneswalkerCard => (
  "loyalty" in card
);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data: Card | (CreatureCard) | (PlaneswalkerCard) = req.body.card;

  const card: ICard = await CardController.getOne({ name: data.name });

  let set = await SetController.getOne({ name: data.setName });

  if (!set) set = await SetController.create({ name: data.setName, code: data.set, cards: [] });

  if (!card || set._id.toString() !== card.set.toString()) {
    const newCard = await CardController.create({
      ...{
        set: set._id as IDType,
        name: data.name,
        imageUrl: data.imageUrl,
        rarity: data.rarity,
        type: data.types[0],
        subTypes: data.subtypes,
        manaCost: data.manaCost,
        colors: data.colors,
        text: data.originalText,
        copies: 1,
      },
      ...(isCreature(data) && {
        power: parseInt(data.power),
        toughness: parseInt(data.toughness),
      }),
      ...(isPlaneswalker(data) && {
        loyalty: (data as (Card & PlaneswalkerCard)).loyalty
      })
    });

    if (!newCard) res.status(424).end("was unable to create new card");
    else {
      set.cards.push(new Types.ObjectId(newCard._id));
      set.save();

      res.status(201).end("new card created and added to set");
    }
  } else {
    if (!(await CardController.addCopy(card._id as IDType, card.copies))) {
      res.status(409).end("unable to update number of coppies on card");
    } else res.status(204).end("Updated Card Copies")
  }
}