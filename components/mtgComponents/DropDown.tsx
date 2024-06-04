import { ReactNode } from "react";

type Props = { 
  children: ReactNode | ReactNode[], 
  title: string, 
  group: string, 
  groupHover: string
}

const DropDown = ({ children, title, group, groupHover }: Props) => (
  <div className={`mb-1 col-start-3 text-center w-full bg-white text-black rounded-xl hover:rounded-l-none ${group}`}>
    <h3 className="col-span-full hover:cursor-pointer">
      {title.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter)}
    </h3>
    <div className={`absolute hidden bg-white w-full rounded-xl flex-col right-full -top-1/3 ${groupHover}`}>
      {children}
    </div>
  </div>
)

export default DropDown;