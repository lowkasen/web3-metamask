import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Sidenavbar from "../components/Sidenavbar";

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
    <div className="flex flex-row h-screen bg-slate-100">
      <Head>
        <title>Web 3 Metamask</title>
        <meta name="description" content="Test metamask features" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidenavbar />

      <div className="flex flex-col w-screen justify-center items-center">
        <h1>Web3 Metamask by Ka Sen Low</h1>

        <p>Get started by pressing Connect</p>

        <button onClick={handleClick} disabled={connectButtonDisabled}>
          {connected ? "Disconnect" : "Connect"}
        </button>
        <p>{connectMessage}</p>
      </div>
    </div>
  );
};

export default Home;
