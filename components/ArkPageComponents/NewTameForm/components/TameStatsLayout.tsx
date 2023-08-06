import { ChangeEventHandler, FocusEventHandler } from "react";
import { tameStats } from "../../../../utils/database/collections/ark/types";
import StatsLayout from "./StatsLayout";

type props = {
  stats: tameStats;
  errors?: any;
  touched?: any;
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
}

const TameStatsLayout = ({ stats, errors, touched, handleChange, handleBlur }: props) => (
  <label role="group" htmlFor="stats" className="newArkTameFormContainerDefault newArkTameStatsFormContainer">
    <p className="text-center self-center">Tame Stats</p>
    <label role="group" htmlFor="stats.starting" className="row-span-2 px-1">
      <StatsLayout
        forGroup="stats.starting"
        label='starting'
        stats={stats.starting}
        errors={errors?.stats?.starting}
        touched={touched?.stats?.starting}
        handleChange={handleChange}
        handleBlur={handleBlur}
        minimize={true}
      />
    </label>
    <label role="group" htmlFor="stats.current" className="row-span-2 px-1">
      <StatsLayout
        forGroup="stats.current"
        label="current"
        stats={stats.current}
        errors={errors?.lvl?.added}
        touched={touched?.stats?.current}
        handleChange={handleChange}
        handleBlur={handleBlur}
        minimize={true}
      />
    </label>
    <label role="group" htmlFor="stats.affinity" className="row-span-2 px-1">
      <StatsLayout
        forGroup="stats.affinity"
        label="affinity"
        stats={stats.affinity}
        errors={errors?.stats?.affinity}
        touched={touched?.stats?.affinity}
        handleChange={handleChange}
        handleBlur={handleBlur}
        minimize={true}
      />
    </label>
  </label>
);

export default TameStatsLayout