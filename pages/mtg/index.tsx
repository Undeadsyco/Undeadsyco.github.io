import Link from "next/link";
import CardController, { CustomCard } from "../../lib/collections/mtg/cards";
import { CardList, MtgCard, MtgHeader } from "../../components/mtgComponents";
import SetController, { ISet } from "../../lib/collections/mtg/sets";
import DeckController, { IDeck } from "../../lib/collections/mtg/deck";
import { useState } from "react";

function MTG({ cards, sets, decks }: { cards: CustomCard[], sets: ISet[], decks: IDeck[] }) {
  const [list, setList] = useState<any[]>(cards);

  const changeList = (collection: string) => {
    if (collection === "cards") setList(cards);
    if (collection === "sets") setList(sets);
    if (collection === "decks") setList(decks);
  }

  return (
    <div className="w-full h-full grid grid-rows-12">
      <MtgHeader />
      <CardList>
        {cards.map(card => (
          <MtgCard key={card._id as string} {...{ card: card }}>
            <p>Copies: {card.copies}</p>
          </MtgCard>
        ))}
      </CardList>
    </div>
  );
}

export default MTG;

export const getServerSideProps = async () => {

  const cards = await CardController.getAll();
  const sets = await SetController.getAll();
  const decks = await DeckController.getAll();

  return {
    props: {
      cards,
      sets,
      decks,
    }
  };
}