import { Poppins } from 'next/font/google';
import '../styles/globals.css';

import { SWRConfig } from 'swr';

import Layout from '@/components/Layout';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  preload: false,
});

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
        revalidateOnFocus: false,
      }}>
      <div
        className={`min-h-screen container mx-auto flex flex-col ${poppins.variable} font-sans font-normal`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SWRConfig>
  );
}
