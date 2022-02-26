import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import detectEthereumProvider from "@metamask/detect-provider";

const Home: NextPage = () => {
  interface RequestArguments {
    method: string;
    params?: unknown[] | object;
  }

  const args: RequestArguments = {
    method: "eth_requestAccounts",
  };

  const [connectMessage, setconnectMessage] = useState("");

  async function connectMetamask() {
    setconnectMessage("Connecting");
    const provider: any = await detectEthereumProvider();
    if (provider) {
      try {
        console.log(provider.isConnected());
        let accounts = await (provider.request(args) as Promise<Array<string>>);
        console.log(accounts);
        setconnectMessage(
          "Connected successfully, wallet address is " + accounts[0]
        );
      } catch (error) {
        console.log(error);
        setconnectMessage("Error connecting");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Web 3 Metamask</title>
        <meta name="description" content="Test metamask features" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Web3 Metamask by Ka Sen Low</h1>

        <p className={styles.description}>Get started by pressing Connect</p>

        <button onClick={connectMetamask}>Connect</button>
        <p>{connectMessage}</p>
      </main>
    </div>
  );
};

export default Home;
