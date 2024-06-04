import Link from "next/link";
import CardController, { ICard } from "../../lib/collections/mtg/cards";
import { CardList, MtgCard, MtgHeader } from "../../components/mtgComponents";
import SetController from "../../lib/collections/mtg/sets";
import DeckController from "../../lib/collections/mtg/deck";

function MTG({ cards }: { cards: ICard[] }) {
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