import '../styles/globlas.css';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Consuming API YouTube</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
