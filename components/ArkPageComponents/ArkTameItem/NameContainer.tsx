type props = {
  name: string;
  deceased: boolean
}

const deceasedComp = <p className="text-red-700 font-bold">Deceased</p>

const NameContainer = ({ name, deceased }: props) => (
  <div className="flex justify-between">
    <h2 className={`${deceased ? 'line-through decoration-red-700 decoration-4' : null}`}>{name}</h2>
    {deceased && deceasedComp}
  </div>
)

export default NameContainer;