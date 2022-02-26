import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3 from "web3";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const web3 = new Web3("ws://localhost:8546");
    console.log(typeof web3);
    console.log(web3.currentProvider);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
