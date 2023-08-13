import { ReactHTMLElement, useEffect } from 'react';

type props = {
  children: any;
}

export default function ArkTableContainer({ children  }: props) {

  return (
    <div className='grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full'>
      {children}
    </div>
  );
}