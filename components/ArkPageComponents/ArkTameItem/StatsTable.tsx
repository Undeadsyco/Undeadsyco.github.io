type stats = {
  health: number;
  stamina: number;
  weight: number;
  damage: number;
}

const TameStats = ({ stats: { health, stamina, weight, damage } }: { stats: stats }) => (
  <div>
    <p className="underline">Starting</p>
    <ul>
      <li>{health}</li>
      <li>{stamina}</li>
      <li>{weight}</li>
      <li>{damage}</li>
    </ul>
  </div>
);

const TameAffinities = ({ affinity: { health, stamina, weight, damage } }: { affinity: stats }) => (
  <div>
    <p className="underline">Affinity</p>
    <ul>
      <li>+{health}/lvl</li>
      <li>+{stamina}/lvl</li>
      <li>+{weight}/lvl</li>
      <li>+{damage}/lvl</li>
    </ul>
  </div>
);

const StatsTable = ({ stats, affinity }: { stats: stats, affinity: stats }) => (
  <div className="flex justify-around">
    <div>
      <p className="underline">Stats</p>
      <ul>
        <li>Health:</li>
        <li>Stamina:</li>
        <li>Weight:</li>
        <li>Damage:</li>
      </ul>
    </div>
    <TameStats stats={stats} />
    <TameAffinities affinity={affinity} />
  </div>
);

export default StatsTable;