import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-lp-300 dark:bg-dp-300 text-ls-300 dark:text-white-300 text-sm lg:text-base">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
