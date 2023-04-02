type props = {
  visible: boolean
}
const Modal = ({ visible }: props) => (
  <>
    <div className="bg-slate-900 opacity-70 w-full h-full absolute"></div>
    <div className={`${visible ? 'block' : 'hiddin'} absolute w-full h-full left-0 top-0 flex justify-center items-center`}>
      
      <div className="bg-white w-1/6 h-2/6 grid grid-cols-1 grid-rows-3 ">
        <h2 className="text-black">New Creature</h2>
        <button className="bg-gray-600 border-2 text-white">Wild Tame</button>
        <button className="bg-gray-700 border-2 text-white">Born Tame</button>
      </div>
    </div>
  </>

);

export default Modal