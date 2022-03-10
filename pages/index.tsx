import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Gridcardhome from "../components/Gridcardhome";
import Sidenavbar2 from "../components/Sidenavbar2";
import { useWeb3React } from "@web3-react/core";
import Sendtransactioncard from "../components/Sendtransactioncard";
import { FormDataInterface } from "../components/Sendtransactioncard";

const Home: NextPage = () => {
  const [buttonText, setButtonText] = useState("Connect");
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState("2.435 ETH");
  const [formData, setFormData] = useState<FormDataInterface>({
    address: "",
    amount: NaN,
    message: "",
  });

  const { account, chainId, library } = useWeb3React();

  useEffect(() => {
    const getAccountBalance = async () => {
      try {
        if (account) {
          const gwei = await library.eth.getBalance(account);
          setBalance(`${library.utils.fromWei(gwei, "ether")} ETH`);
        } else {
          setBalance("Disconnected");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAccountBalance();
  }, [account]);

  const getShortenedAccount = () => {
    let accountShortened = "";
    if (account && chainId && chainId === 4) {
      accountShortened = account.slice(0, 4) + "..." + account.slice(-4);
    } else {
      accountShortened = "Wrong network!";
    }
    return accountShortened;
  };

  return (
    <div className="flex flex-row h-screen bg-slate-200">
      <Head>
        <title>Web 3 Metamask</title>
        <meta name="description" content="Test metamask features" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidenavbar2
        connected={connected}
        setConnected={setConnected}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />

      <div className="flex flex-col w-screen px-7 pt-10">
        <h1 className="text-4xl font-bold">Web3 Metamask by Ka Sen Low</h1>
        <p className="text-xl my-3">Get started by pressing Connect</p>
        <div className="grid grid-cols-2 gap-4 mt-6 drop-shadow">
          <Gridcardhome heading="Account Balance" text={balance} />
          <Gridcardhome
            heading="Chain"
            text={chainId ? chainId.toString() : "0"}
          />
          <Gridcardhome
            heading="Address"
            text={connected ? getShortenedAccount() : "Disconnected"}
          />
          <Gridcardhome heading="Hello" text="World" />
        </div>
        <Sendtransactioncard formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default Home;
