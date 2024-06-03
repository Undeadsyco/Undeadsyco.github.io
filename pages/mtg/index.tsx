import Link from "next/link";
import CardController, { ICard } from "../../lib/collections/mtg/cards";
import Image from "next/image";

function MTG({ cards }: { cards: ICard[] }) {
  return (
    <div className="w-full h-full grid grid-rows-12">
      <h1>MTG Cards Database</h1>
      <div className="grid grid-cols-3 grid-rows-2 text-center">
        <h3 className="col-span-full">Add New</h3>
        <Link href="/mtg/new/card" >New Card</Link>
        <Link href="/mtg/new/set" >New Set</Link>
        <Link href="/mtg/new/deck" >New Deck</Link>
      </div>
      <div  className="row-span-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll">
        {cards.map(card => (
          <div key={card._id as string} className="w-full mx-auto mb-8 flex flex-col justify-center items-center">
            <Image src={card.imageUrl} alt={card.name}  className="w-[80%] h-auto" width={200} height={300} />
            <p>Copies: {card.copies}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MTG;

export const getServerSideProps = async () => {

  const cards = await CardController.getAll();

  return {
    props: {
      cards: cards
    }
  };
}