type props = {
  age: string;
}

const Timer = (<p className="TameAgeTimer">2D 11H 3M</p>)

const AgeContainer = ({ age }: props) => (
  <div className="AgeContainer">
    <p className="AgeContent">
      <span>Age:</span>
      <span>{age}</span>
    </p>
    {age !== 'Adult' ? Timer : null }
  </div>
);

export default AgeContainer;