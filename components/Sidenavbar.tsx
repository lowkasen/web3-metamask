import {
  MenuIcon,
  HomeIcon,
  SupportIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useState } from "react";

export default function Sidenavbar(props: {
  provider: any;
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  buttonText: string;
  setButtonText: Dispatch<SetStateAction<string>>;
}) {
  const [connectButtonDisabled, setconnectButtonDisabled] = useState(false);

  interface RequestArguments {
    method: string;
    params?: unknown[] | object;
  }

  const args: RequestArguments = {
    method: "eth_requestAccounts",
  };

  async function handleClick() {
    try {
      if (!props.connected) {
        await connectMetamask();
      } else {
        await disconnectMetamask();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function connectMetamask() {
    props.setButtonText("Connecting");
    setconnectButtonDisabled(true);
    if (props.provider) {
      try {
        let accounts = await (props.provider.request(args) as Promise<
          Array<string>
        >);
        let accountShortened =
          accounts[0].slice(0, 4) + "..." + accounts[0].slice(-4);
        props.setButtonText(accountShortened);
        props.setConnected(true);
        if (parseInt(props.provider.chainId, 16) !== 4) {
          props.setButtonText("Wrong network!");
        }
      } catch (error) {
        console.error(error);
        props.setButtonText("Error!");
        props.setConnected(false);
      }
    } else {
      console.log("Please install MetaMask!");
    }
    setconnectButtonDisabled(false);
  }
  async function disconnectMetamask() {
    props.setButtonText("Disconnecting");
    setconnectButtonDisabled(true);
    try {
      props.setButtonText("Connect");
      props.setConnected(false);
    } catch (error) {
      console.error(error);
      props.setButtonText("Error!");
    }
    setconnectButtonDisabled(false);
  }

  return (
    <div className="flex flex-col w-96 py-10 px-6 bg-zinc-900 text-gray-200">
      <div className="flex">
        <MenuIcon className="flex-none w-6" />
        <div className="flex-auto flex justify-center items-center">
          <p className="text-2xl font-bold">AdrrInfo</p>
        </div>
      </div>
      <div className="flex-auto flex flex-col py-20">
        <div className="flex my-4">
          <HomeIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">Home</p>
        </div>
        <div className="flex my-4">
          <UserIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">About</p>
        </div>
        <div className="flex my-4">
          <SupportIcon className="flex-none w-6" />
          <p className="flex-auto ml-4 font-medium">Contact</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          disabled={connectButtonDisabled}
          className="flex-auto border rounded-md border-slate-50 p-3 hover:bg-zinc-800"
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
