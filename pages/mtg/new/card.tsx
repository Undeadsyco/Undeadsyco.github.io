// dependencies
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
// dependency components
import Image from "next/image";
// types
import type { Card } from "mtgsdk-ts/out/IMagic";
import Link from "next/link";

function NewCard() {
  const router = useRouter();
  let searchTimeout: NodeJS.Timeout | null = null;

  const inputRef = useRef(null);
  const [cardList, setCardList] = useState<Card[]>([]);

  const searchCards = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (searchTimeout) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }

    if (!e.target?.value) {
      setCardList([]);
      return;
    }

    searchTimeout = setTimeout(() => {
      axios.get(`/api/mtg?name=${e.target.value}`).then(({ status, data }) => {
        if (status !== 200) return;
        setCardList(data.cards);
      });
    }, 1000);
  }

  const clearSeearch = () => {
    if (inputRef.current) (inputRef.current as HTMLInputElement).value = "";
    setCardList([]);
  }

  const addToCollection = (card: Card) => {
    axios.post("/api/mtg/new/card", { card }).then(res => {
      alert(`${res.status}, ${res.data}`);
    });
  }

  const addToDeck = (deck: string, card: Card) => {
    axios.post("/api/mtg/card/card", { deck, card }).then(res => {
      alert(`${res.status}, ${res.data}`);
    });
  }

  return (
    <div className="w-full h-full grid grid-rows-12">
      <div className="text-xl flex">
        <Link className="ml-4 mr-[40%]" href="/mtg">Back</Link>
        <h1 className="text-center">Add A New Card</h1>
      </div>
      <div className="justify-self-center w-full flex justify-around items-center">
        <label htmlFor="search">Search for card</label>
        <div className="w-[50%] relative">
          <input ref={inputRef} type="text" name="search" id="search" onChange={searchCards} className="px-4 py-1 w-full rounded-full" />
          <button onClick={clearSeearch} className="absolute bg-white text-black px-4 py-1 rounded-full right-0 font-bold border-2 border-gray-400">Clear</button>
        </div>
      </div>
      <div className="row-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll">
        {cardList.map((card) => (
          <div key={card.id} className="w-full mx-auto mb-8 flex flex-col justify-center items-center">
            <Image src={card.imageUrl} alt={card.name} className="w-[80%] h-auto" width={200} height={300} />
            <button onClick={() => addToCollection(card)} className="bg-white rounded-full text-black border-black border-2 px-2 m-auto">
              Add to Collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewCard;
