import type { NextApiRequest, NextApiResponse } from "next";
import { Types } from 'mongoose';
import { Card, CreatureCard, PlaneswalkerCard } from "mtgsdk-ts/out/IMagic";
import CardController, { ICard } from "../../../../lib/collections/mtg/cards";
import { IDType } from "../../../../types";
import SetController, { ISet } from "../../../../lib/collections/mtg/sets";

type Data = {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data: Card | (Card & CreatureCard) | (Card & PlaneswalkerCard) = req.body.card;

  const card: ICard = await CardController.getOne({ name: data.name });

  let set = await SetController.getOne({ name: data.setName });

  if (!set) set = await SetController.create({ name: data.setName, code: data.set, cards: [] });

  if (!card || set._id.toString() !== card.set.toString()) {
    const newCard = await CardController.create({
      set: set._id as IDType,
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