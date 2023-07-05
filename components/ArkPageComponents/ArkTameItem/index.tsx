import Image from "next/image";
import { Name, Levels, Stats, Sex, Age, Heratage } from "./components";

type parents = {
  mother: string;
  father: string;
}

const ArkTameItem = ({ tame }: { tame: any }) => (
  <div className="TameItem">
    <div className="TameImg"> {/* <Image  /> */} </div>
    <Name name={tame.name} deceased={tame.deceased} />
    <Sex sex={tame.sex} />
    <Age age="Adult" />
    <Levels lvl={tame.lvl} />
    <Stats stats={tame.stats} affinity={tame.affinity} />
    <Heratage status={tame.tamed_status} />
  </div>
)

export default ArkTameItem;