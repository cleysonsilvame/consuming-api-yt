import '../styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import YoutubeProvider from '../context/Youtube';
import ComposeProvider from '../context/ComposeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>cPicker</title>
        <link rel="shortcut icon" href="/img/logo-nd.ico" type="image/ico" />
      </Head>
      <ComposeProvider components={[YoutubeProvider]}>
        <Component {...pageProps} />
      </ComposeProvider>
      <footer className="text-center fixed-bottom">
        <p>Copyright (c) 2020 Cleyson Silva</p>
      </footer>
    </>
  );
}

export default MyApp;
