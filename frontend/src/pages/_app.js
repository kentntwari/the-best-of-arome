import '../styles/globals.css';
import { poppins } from '@/styles/fonts';

import { SWRConfig } from 'swr';

import Layout from '@/components/Layout';
import { PlayerProvider } from '@/context/PlayerContext';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
        revalidateOnFocus: false,
      }}>
      <div
        className={`min-h-screen mx-auto flex flex-col ${poppins.variable} font-sans font-normal`}>
        <PlayerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PlayerProvider>
      </div>
    </SWRConfig>
  );
}
