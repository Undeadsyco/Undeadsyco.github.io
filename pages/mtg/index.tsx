import Link from "next/link";
import CardController from "../../lib/collections/mtg/cards";

function MTG() {
  return (
    <div>
      <h1>MTG Cards Database</h1>

      <Link href="/mtg/new/card" >New Card</Link>
    </div>
  );
}

export default MTG;

export const getServerProps = async () => {

  const cards = await CardController.getAll() || [];
  // const cards: any[] = [];

  return {
    props: {
      cards: cards 
    }
  };
}