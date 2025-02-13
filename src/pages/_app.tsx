import { store } from "@/app/store";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"], display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Head>
        <title>Discord Clone</title>
      </Head>
      <Provider store={store}>
        <div className={notoSansJP.className}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </div>
  )
}
