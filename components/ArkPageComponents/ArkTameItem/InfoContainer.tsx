type props = {
  species: string;
  sex: string;
  status: string;
}

const InfoContainer = ({ species, sex, status}: props) => (
  <div className="flex justify-between">
    <p>Species: {species}</p>
    <p>Sex: {sex}</p>
    <p>Tamed Status: {status}</p>
  </div>
);

export default InfoContainer;