// dependencies
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
// dependency components
import Image from "next/image";
// types
import type { Card } from "mtgsdk-ts/out/IMagic";

function NewCard() {
  const router = useRouter();
  let searchTimeout: NodeJS.Timeout | null = null;

  const [cardList, setCardList] = useState<Card[]>([]);

  const searchCards = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }

    if (!e.target?.value) return;

    searchTimeout = setTimeout(() => {
      const cards = axios.get(`/api/mtg?name=${e.target.value}`).then(({ status, data }) => {
        if (status !== 200) return;
        console.log("card list", data.cards)
        setCardList(data.cards);
      });
    }, 1000);
  }

  const addToCollection = (card: Card) => {
    axios.post("/api/mtg/new/card", { card }).then(res => {
      alert(`${res.status}, ${res.data}`);
    })
  }

  return (
    <div className="w-full h-full grid grid-rows-12">
      <h1 className="text-center text-xl">Add A New Card</h1>
      <div className="justify-self-center w-1/4 flex justify-around items-center">
        <label htmlFor="search">Search for card</label>
        <input type="text" name="search" id="search" onChange={searchCards} className="px-4 w-[50%] rounded-full" />
      </div>
      <div  className="row-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll">
        {cardList.map((card) => (
          <div key={card.id} className="w-full mx-auto mb-8 flex flex-col justify-center items-center">
            {card.type}
            <Image src={card.imageUrl} alt={card.name} className="w-[80%] h-auto" width={200} height={300} />
            <div className="w-[80%] mt-2 flex justify-between text-black text-lg md:text-base">
              <button onClick={() => addToCollection(card)} className="bg-white rounded-full border-black border-2 px-2">Add to Collection</button>
              <button className="bg-white rounded-full border-black border-2 text-black px-2">Add to Deck</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewCard;
