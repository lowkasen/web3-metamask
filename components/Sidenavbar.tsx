import { useWeb3React } from "@web3-react/core";
import { useState, Dispatch, SetStateAction } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  MenuIcon,
  HomeIcon,
  SupportIcon,
  UserIcon,
} from "@heroicons/react/solid";

interface Sidenavbarprops {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  buttonText: string;
  setButtonText: Dispatch<SetStateAction<string>>;
}

export function Sidenavbar({
  connected,
  setConnected,
  buttonText,
  setButtonText,
}: Sidenavbarprops) {
  const [connectButtonDisabled, setconnectButtonDisabled] = useState(false);
  const { account, chainId, activate, deactivate } = useWeb3React();

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
    try {
      setButtonText("Connecting");
      setconnectButtonDisabled(true);
      await activate(new InjectedConnector({ supportedChainIds: [4] }));
      setConnected(true);
      setButtonText("");
    } catch (error) {
      console.error(error);
      setButtonText("Error!");
      setConnected(false);
    }
    setconnectButtonDisabled(false);
  }

  async function disconnectMetamask() {
    try {
      setButtonText("Disconnecting");
      setconnectButtonDisabled(true);
      deactivate();
      setButtonText("Connect");
      setConnected(false);
    } catch (error) {
      console.error(error);
      setButtonText("Error!");
    }
    setconnectButtonDisabled(false);
  }

  const getShortenedAccount = () => {
    let accountShortened = "";
    if (account) {
      accountShortened = account.slice(0, 4) + "..." + account.slice(-4);
    } else {
      accountShortened = "";
    }
    return accountShortened;
  };

  const checkChainId = () => {
    if (chainId && chainId === 4) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      id="sidenavbar"
      className="fixed md:relative 
        inset-y-0 left-0 transform -translate-x-full md:translate-x-0 
        transition duration-200 ease-in-out z-10 
        flex flex-col w-64 py-10 px-6 bg-blue-200 text-blue-900 shadow-lg shadow-blue-900"
    >
      <div className="flex">
        {/* <MenuIcon className="flex-none w-6" /> */}
        <div className="flex-auto flex justify-center items-center">
          <p className="text-2xl font-bold">AdrrInfo</p>
        </div>
      </div>
      <div className="flex-auto flex flex-col py-20">
        <a href="/" className="flex my-4">
          <HomeIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">Home</p>
        </a>
        <a href="/about" className="flex my-4">
          <UserIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">About</p>
        </a>
        <a href="/contact" className="flex my-4">
          <SupportIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">Contact</p>
        </a>
      </div>
      <button
        className="rounded-md bg-blue-900 text-blue-100 p-3 hover:bg-blue-800 hover:text-blue-100"
        onClick={handleClick}
        disabled={connectButtonDisabled}
      >
        {connected && !checkChainId()
          ? "Wrong network!"
          : buttonText + getShortenedAccount()}
      </button>
    </div>
  );
}
