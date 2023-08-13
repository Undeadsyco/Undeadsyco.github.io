import type { Tame } from "../../../utils/database/collections/ark/TamesModel";

import Image from "next/image";
import Link from "next/link";
import { Name, Levels, Stats, Sex, Age, Heratage } from "./components";

type parents = {
  mother: string;
  father: string;
}

const ArkTameItem = ({ tame }: { tame: Tame }) => (
  <div className="arkDefaultContainer tameItem">
    <div className="tameImg"> {/* <Image  /> */} </div>
    <Link href={{
      pathname: `/ark/${tame._id}`,
      query: JSON.stringify(tame)
    }} className="tameNameContainer"><Name name={tame.name} deceased={tame.deseased} path={tame._id} /></Link>
    <Sex sex={tame.sex} />
    <Age age="Adult" />
    <Levels lvl={tame.lvl} />
    <Stats stats={tame.stats} />
    <Heratage status={tame.tamed ? "tamed" : "breed"} />
  </div>
)

export default ArkTameItem;