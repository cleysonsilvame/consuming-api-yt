import '../styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import YoutubeProvider from '../context/Youtube';
import ComposeProvider from '../context/ComposeProvider';
import FacebookProvider from '../context/Facebook';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>cPicker</title>
        <link rel="shortcut icon" href="/img/logo-nd.ico" type="image/ico" />
      </Head>
      <ComposeProvider components={[YoutubeProvider, FacebookProvider]}>
        <Component {...pageProps} />
      </ComposeProvider>
    </>
  );
}

export default MyApp;
