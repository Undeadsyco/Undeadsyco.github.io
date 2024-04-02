import { Species } from "../../../utils/database/collections/ark/SpeciesModel";

type props = {
  species: Species
};

export default function ArkSpeciesTableItem({ species }: props) {
  return (
    <div className="arkDefaultContainer h-fit">
      <p className=" px-4">species: {species.name}</p>
      <div className="flex justify-around items-center">
        <p>diet: {species.diet}</p>
        <p>temperament: {species.temperament}</p>
      </div>
      <div className="flex justify-around items-center">
        <p>tamable: {species.tamable ? 'yes' : 'no'}</p>
        <p>ridable: {species.ridable ? 'yes' : 'no'}</p>
        <p>breedable: {species.breedable ? 'yes' : 'no'}</p>
      </div>
    </div>
  )
}