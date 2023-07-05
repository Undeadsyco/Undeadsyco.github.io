type props = {
  name: string;
  deceased: boolean;
}

const deceasedComp = <p className="Deceased">Deceased</p>

const NameContainer = ({ name, deceased }: props) => (
  <div className="TameNameContainer">
    <h2 className={`TameName ${deceased ? 'DeceasedNameDecor' : null}`}>{name}</h2>
    <p>{deceased && deceasedComp}</p>
  </div>
)

export default NameContainer