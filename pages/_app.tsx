import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Nav } from '../components';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <div className='circuit-bg'></div>
      <div className='container'>
        <Nav />
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
