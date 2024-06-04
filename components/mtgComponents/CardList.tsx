import { Card } from "mtgsdk-ts/out/IMagic";
import axios from "axios";
import { ReactNode } from "react";

const CardList = ({ children }: { children: ReactNode[] }) => (
  <div className="row-span-10 row-start-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll">
    {children}
  </div>
);

export default CardList;