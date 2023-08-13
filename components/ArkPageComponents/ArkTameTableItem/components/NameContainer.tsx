type props = {
  name: string;
  deceased: boolean;
  path: string
}

const deceasedComp = <p className="Deceased">Deceased</p>

const NameContainer = ({ name, deceased, path }: props) => (
  <>
   <span className={`TameName ${deceased ? 'DeceasedNameDecor' : null}`}>{name}</span>
    <span>{deceased && deceasedComp}</span>
  </>
)

export default NameContainer