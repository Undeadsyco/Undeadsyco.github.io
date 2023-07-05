import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

type props = {
  sex: string;
}

const SexContainer = ({ sex }: props) => (
  <div className="TameSexContainer">
    <span>Sex:</span>
    <span>{sex === 'M' ? <BsGenderMale /> : <BsGenderFemale />}</span>
  </div>
)

export default SexContainer;