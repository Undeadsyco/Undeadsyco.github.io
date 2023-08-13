type lvls = {
  wild?: number;
  tamed: number;
  max: number;
}

const LvlContent = ({ title, content }: { title: string, content: number }) => (
  <p className="LevelContent"><span>{title}:</span> {content}</p>
)

const LvlContainer = ({ lvl: { wild, tamed, max } }: { lvl: lvls }) => (
  <div className="LvlContainer">
    <h3 className="LevelTitle">levels</h3>
    {tamed ? (<LvlContent title="Wild" content={wild!} />): null}
    <LvlContent title={tamed ? "tamed" : 'born'} content={tamed} />
    <LvlContent title="Max" content={max} />
  </div>
)

export default LvlContainer;