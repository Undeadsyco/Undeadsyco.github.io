import InfoContainer from "./InfoContainer";
import LvlContainer from "./LevelsContainer";
import NameContainer from "./NameContainer";
import StatsTable from "./StatsTable";

type parents = {
  mother: string;
  father: string;
}

const ParentsContainer = ({ parents: { mother, father } }: { parents: parents }) => (
  <div>
    <p>Mother: {mother}</p>
    <p>Father: {father}</p>
  </div>
)

const ArkTameItem = ({ tame }: { tame: any }) => (
  <div className="bg-slate-700 p-2">
    <NameContainer name={tame.name} deceased={tame.deceased} />
    <InfoContainer species={tame.species} sex={tame.sex} status={tame.tamed_status} />
    <LvlContainer lvl={tame.lvl} />
    {tame.parents ? <ParentsContainer parents={tame.parents} /> : null}
    <StatsTable stats={tame.stats} affinity={tame.affinity} />
  </div>
)

export default ArkTameItem;