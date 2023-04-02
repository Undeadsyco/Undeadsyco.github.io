type lvls = {
  wild: number;
  tamed: number;
  max: number;
}

const LvlContainer = ({ lvl: { wild, tamed, max } }: { lvl: lvls }) => (
  <div className="flex justify-between">
    <h3>levels</h3>
    {wild ? (<p> Wild: {wild}</p>) : null}
    <p>Tamed: {tamed}</p>
    <p>Max: {max}</p>
  </div>
)

export default LvlContainer;