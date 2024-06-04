import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import DropDown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

library.add(faLayerGroup);

const MtgHeader = () => {

  const pathname = usePathname();
  const [viewNavDisplay, setViewNavDisplay] = useState(false);
  const [addNavDisplay, setAddNavDisplay] = useState(false);
  return (
    <div className="row-span-1 grid grid-cols-4 justify-center items-center text-center">
      {pathname !== "/mtg" && <Link className="col-start-1" href="/mtg">Back</Link>}

      <h1 className="col-start-2 col-span-2">MTG Cards Database</h1>

      <div className="flex relative group/view w-full mx-auto text-center justify-center">
        <FontAwesomeIcon icon="layer-group" />
        {/* <div className="w-full">View</div> */}
        <div className="hidden absolute group-hover/view:flex flex-col w-full top-full left-0">
          <DropDown title="collections" group="group/collections" groupHover="group-hover/collections:flex">
            <button>Cards</button>
            <button>Sets</button>
            <button>Decks</button>
          </DropDown>

          <DropDown title="add" group="group/add" groupHover="group-hover/add:flex group-hover/add:rounded-br-none">
            <Link href="/mtg/card/new" >Card</Link>
            <Link href="/mtg/set/new" >Set</Link>
            <Link href="/mtg/deck/new" >Deck</Link>
          </DropDown>
        </div>
      </div>
    </div>
  )
}

export default MtgHeader;