import Image from "next/image";
import Link from "next/link";
import { Name, Levels, Stats, Sex, Age, Heratage } from "./components";

type parents = {
  mother: string;
  father: string;
}

const ArkTameItem = ({ tame }: { tame: any }) => (
  <div className="arkDefaultContainer tameItem">
    <div className="tameImg"> {/* <Image  /> */} </div>
    <Link href={{
      pathname: `/ark/${tame.id}`,
      query: tame
    }} className="tameNameContainer"><Name name={tame.name} deceased={tame.deceased} path={tame.id} /></Link>
    <Sex sex={tame.sex} />
    <Age age="Adult" />
    <Levels lvl={tame.lvl} />
    <Stats stats={tame.stats} affinity={tame.affinity} />
    <Heratage status={tame.tamed_status} />
  </div>
)

export default ArkTameItem;