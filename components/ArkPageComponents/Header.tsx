type arkHeaderProps = {
  active: string;
  setActive: Function;
}
const ArkHeader = ({ active, setActive }: arkHeaderProps) => (
  <div className="ark-header h-1/5 flex flex-wrap justify-between">
    <h1 className="w-full">Ark Collection Database</h1>
    <ul className="flex w-1/4 justify-around">
      <li className={`${active === 'members' ? 'text-yellow-500' : null}`}>
        <button onClick={() => setActive('members')}>Members</button>
      </li>
      <li className={`${active === 'tames' ? 'text-yellow-500' : null}`}>
        <button onClick={() => setActive('tames')}>Tames</button>
      </li>
      <li className={`${active === 'items' ? 'text-yellow-500' : null}`}>
        <button onClick={() => setActive('items')}>Items</button>
      </li>
    </ul>
    <div>
      <button>Add New</button>
    </div>
  </div>
);

export default ArkHeader;