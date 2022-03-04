import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Sidenavbar from "../components/Sidenavbar";
import Gridcardhome from "../components/Gridcardhome";
import { useWeb3React } from "@web3-react/core";

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const [buttonText, setButtonText] = useState("Connect");
  const [connected, setConnected] = useState(false);
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
      // console.log(provider.chainId);
      // console.log(parseInt(provider.chainId, 16));
      provider.on("accountsChanged", function (accounts: Array<string>) {
        if (typeof accounts[0] !== "undefined") {
          let accountShortened =
            accounts[0].slice(0, 4) + "..." + accounts[0].slice(-4);
          setButtonText(accountShortened);
          setAddress(accountShortened);
          setConnected(true);
        } else {
          setButtonText("Connect");
          setConnected(false);
        }
      });
      provider.on("chainChanged", (_chainId: any) => window.location.reload());
    }
    getProvider();
  }, []);

  useEffect(() => {
    async function main() {
      if (provider && connected) {
        try {
          let accounts = await (provider.request(args) as Promise<
            Array<string>
          >);
          let accountShortened =
            accounts[0].slice(0, 4) + "..." + accounts[0].slice(-4);
          setAddress(accountShortened);
        } catch (error) {
          console.error(error);
        }
      } else {
        setAddress("Disconnected");
      }
    }
    main();
  }, [connected]);

  // async function handleClick() {
  //   try {
  //     if (!connected) {
  //       await connectMetamask();
  //     } else {
  //       await disconnectMetamask();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function connectMetamask() {
  //   setconnectMessage("Connecting");
  //   setconnectButtonDisabled(true);
  //   if (provider) {
  //     try {
  //       let accounts = await (provider.request(args) as Promise<Array<string>>);
  //       setconnectMessage(
  //         "Connected successfully, wallet address is " + accounts[0]
  //       );
  //       setConnected(true);
  //       if (parseInt(provider.chainId, 16) !== 4) {
  //         setconnectMessage(
  //           "Wrong network! Please switch to Rinkeby Test Network"
  //         );
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setconnectMessage("Error connecting");
  //       setConnected(false);
  //     }
  //   } else {
  //     console.log("Please install MetaMask!");
  //   }
  //   setconnectButtonDisabled(false);
  // }

  // async function disconnectMetamask() {
  //   setconnectMessage("Disconnecting");
  //   setconnectButtonDisabled(true);
  //   try {
  //     setconnectMessage("");
  //     setConnected(false);
  //   } catch (error) {
  //     console.error(error);
  //     setconnectMessage("Error disconnecting");
  //   }
  //   setconnectButtonDisabled(false);
  // }

  return (
    <div className="flex flex-row h-screen bg-slate-200">
      <Head>
        <title>Web 3 Metamask</title>
        <meta name="description" content="Test metamask features" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidenavbar
        provider={provider}
        connected={connected}
        setConnected={setConnected}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />

      <div className="flex flex-col w-screen px-7 pt-10">
        <h1 className="text-4xl font-bold">Web3 Metamask by Ka Sen Low</h1>
        <p className="text-xl my-3">Get started by pressing Connect</p>
        <div className="grid grid-cols-2 gap-4 mt-6 drop-shadow">
          <Gridcardhome heading="Account Balance" text="2.435 ETH" />
          <Gridcardhome heading="Chain" text="Rinkeby" />
          <Gridcardhome heading="Address" text={address} />
          <Gridcardhome heading="Hello" text="World" />
        </div>
      </div>
    </div>
  );
};

export default Home;
