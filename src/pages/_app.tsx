import { store } from "@/app/store";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Head>
        <title>Discord Clone</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  )
}
