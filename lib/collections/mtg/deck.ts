import { Schema, model, models } from "mongoose";
import { IDType } from "../../../types";
import mtgDB from "../../connections/MtgDBConnect";
import { CustomCard } from "./cards";

export interface IDeck {
  _id?: IDType;
  name: string;
  cards: IDType[] | CustomCard[]
}

export default class DeckController {
  public static model = models?.Deck
    || model<IDeck>("Deck", new Schema<IDeck>({
      name: { type: String, required: true },
      cards: [{ type: Schema.Types.ObjectId, ref: "Card", required: true }]
    }));

  public static isCard = (card: any): card is CustomCard => (
    "_id" in card
  );

  public static strigifyIds = (deck: IDeck) => ({
    ...deck,
    _id: deck._id?.toString(),
    cards: deck.cards.map(card => this.isCard(card) ? { ...card, _id: card._id?.toString() } : card.toString())
  })

  public static async create(set: IDeck): Promise<IDeck> {
    await mtgDB();

    return await this.model.create(set);
  }

  public static async getAll(deck?: { [K in keyof IDeck]?: IDeck[K] }) {
    await mtgDB();
    if (deck) return this.strigifyIds(await this.model.find(deck).lean());
    return this.strigifyIds(await this.model.find().lean());
  }

  public static async getOne(deck: { [K in keyof IDeck]?: IDeck[K] }) {
    await mtgDB();
    return await this.model.findOne({ name: deck.name });
  }

  public static async addCard(deckId: IDType, cardId: IDType) {
    await mtgDB();
    return await this.model.findByIdAndUpdate(deckId, { $push: { cards: cardId } })
  }
}