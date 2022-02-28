import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import detectEthereumProvider from "@metamask/detect-provider";

const Home: NextPage = () => {
  const [connectMessage, setconnectMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [connectButtonDisabled, setconnectButtonDisabled] = useState(false);
  const [provider, setProvider] = useState<any>(null);

  interface RequestArguments {
    method: string;
    params?: unknown[] | object;
  }

  const args: RequestArguments = {
    method: "eth_requestAccounts",
  };

  useEffect(() => {
    async function getProvider() {
      let provider: any = await detectEthereumProvider();
      setProvider(provider);
      console.log(provider.chainId);
      console.log(parseInt(provider.chainId, 16));
      provider.on("accountsChanged", function (accounts: Array<string>) {
        setconnectMessage(
          "Connected successfully, wallet address is " + accounts[0]
        );
        setConnected(true);
      });
      provider.on("chainChanged", (_chainId: any) => window.location.reload());
    }
    getProvider();
  }, []);

  async function handleClick() {
    try {
      if (!connected) {
        await connectMetamask();
      } else {
        await disconnectMetamask();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function connectMetamask() {
    setconnectMessage("Connecting");
    setconnectButtonDisabled(true);
    if (provider) {
      try {
        let accounts = await (provider.request(args) as Promise<Array<string>>);
        setconnectMessage(
          "Connected successfully, wallet address is " + accounts[0]
        );
        setConnected(true);
        if (parseInt(provider.chainId, 16) !== 4) {
          setconnectMessage(
            "Wrong network! Please switch to Rinkeby Test Network"
          );
        }
      } catch (error) {
        console.log(error);
        setconnectMessage("Error connecting");
        setConnected(false);
      }
    } else {
      console.log("Please install MetaMask!");
    }
    setconnectButtonDisabled(false);
  }

  async function disconnectMetamask() {
    setconnectMessage("Disconnecting");
    setconnectButtonDisabled(true);
    try {
      setconnectMessage("");
      setConnected(false);
    } catch (error) {
      console.error(error);
      setconnectMessage("Error disconnecting");
    }
    setconnectButtonDisabled(false);
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

        <button onClick={handleClick} disabled={connectButtonDisabled}>
          {connected ? "Disconnect" : "Connect"}
        </button>
        <p>{connectMessage}</p>
      </main>
    </div>
  );
};

export default Home;
