import '../styles/globals.css';
import { Poppins } from 'next/font/google';

import Layout from '@/components/Layout';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  preload: false,
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`min-h-screen flex flex-col ${poppins.variable} font-sans font-normal`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
