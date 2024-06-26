import Image from "next/image";

import { ReactNode } from "react";

import CardController, { CustomCard, ICard, OfficialCard } from "../../lib/collections/mtg/cards";
import { Card, CreatureCard, PlaneswalkerCard } from "mtgsdk-ts/out/IMagic";

const isCreature = (card: any): card is (Card & CreatureCard) => (
  ("power" && "toughness") in card
);

const isPlaneswalker = (card: any): card is (Card & PlaneswalkerCard) => (
  "loyalty" in card
);

const CollectionCardComp = (card: CustomCard) => {
  return (
    <div>
      <div>
        <h4>{card.name}</h4>
        <p>{card.manaCost}</p>
      </div>
      <div>
        <div>
          <p>{card.rarity}</p>
          <p>{card.type}</p>
          <p>- {card.subTypes.map(subType => <span key={subType}>{subType}</span>)}</p>
        </div>
        <p>{card.text}</p>
        <p>
          {
            CardController.isCreature(card)
              ? <span>{card.power}/{card.toughness}</span>
              : CardController.isPlaneswalker(card)
                ? card.loyalty
                : null
          }
        </p>
      </div>
    </div>
  );
}

const OfficialCardComp = (card: OfficialCard) => (
  <div>
    <div>
      <h4>{card.name}</h4>
      <p>{card.manaCost}</p>
    </div>
    <div>
      <div>{card.type}</div>
      <p>{card.originalText}</p>
      <p>{isCreature(card) ? <span>{card.power}/{card.toughness}</span> : isPlaneswalker(card) ? card.loyalty : null}</p>
    </div>
  </div>
)


const CardDetails = (card: ICard | Card) => (
  (card as ICard)._id ? <CollectionCardComp {...(card as ICard)} /> : <OfficialCardComp {...(card as Card)} />
);

const isCollectionCard = (card: any): card is ICard => (
  "_id" in card
)

const MtgCard = ({ card, children }: { card: ICard | Card, children: ReactNode | ReactNode[] }) => (
  <div className="w-full mx-auto mb-5 flex flex-col justify-center items-center">
    {card.imageUrl ? <Image
      src={card.imageUrl}
      alt={card.name}
      width={200}
      height={300}
      placeholder="blur"
      blurDataURL="/images/mtgCardBack.jpeg"
      className="w-[200px] h-auto"
    /> : <CardDetails {...card} />}
    {children}
  </div>
)

export default MtgCard;
