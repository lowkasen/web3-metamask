import { useWeb3React } from "@web3-react/core";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import Web3 from "web3";

export interface FormDataInterface {
  address: string;
  amount: number;
  message: string;
}

interface Sendtransactioncardprops {
  formData: FormDataInterface;
  setFormData: Dispatch<SetStateAction<FormDataInterface>>;
}

const Sendtransactioncard = ({
  formData,
  setFormData,
}: Sendtransactioncardprops) => {
  const { account, library } = useWeb3React<Web3>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    (formData[e.target.name as keyof FormDataInterface] as any) =
      e.target.value;
    setFormData({ ...formData });
  };

  const handleSendTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (account && library) {
      const main = async () => {
        try {
          const wei = library.utils.toWei(formData.amount.toString());
          const transactionObject = {
            from: account,
            to: formData.address,
            value: wei,
          };

          const test = await library.eth.sendTransaction(transactionObject);
          console.log(test);
        } catch (error) {
          console.error(error);
        }
      };
      main();
    } else {
      console.log("not connected");
    }
  };

  return (
    <div className="flex flex-col border border-black bg-white drop-shadow-md rounded-xl my-6 px-4 py-7">
      <h2 className="text-2xl font-semibold">Send transaction</h2>
      <p className="text-sm mt-1">from Metamask</p>
      <form className="mt-5 mx-5" onSubmit={handleSendTransaction}>
        <div className="flex flex-col">
          <label className="flex flex-col py-1">
            <span className="text-md font-semibold mb-1">
              Receiver address:
            </span>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="0x8A4A47Ea8b52ce27855Edbf2b9De24C249eE0285"
              className="rounded py-1 px-2 bg-gray-100"
            />
          </label>
          <div className="flex flex-wrap justify-between gap-x-2">
            <label className="flex-auto flex flex-col py-1">
              <span className="text-md font-semibold mb-1">Amount (ETH):</span>
              <input
                type="text"
                name="amount"
                onChange={handleChange}
                placeholder="1.2345"
                className="rounded py-1 px-2 bg-gray-100"
              />
            </label>
            {/* <div className="mx-2"></div> */}
            <label className="flex-auto flex flex-col py-1">
              <span className="text-md font-semibold mb-1">Message:</span>
              <input
                type="text"
                name="message"
                onChange={handleChange}
                placeholder="Hello World"
                className="rounded py-1 px-2 bg-gray-100"
              />
            </label>
          </div>
          <div className="flex justify-center pt-6">
            <input
              type="submit"
              value="Send"
              className="px-5 py-2 bg-blue-900 text-blue-100 p-3 hover:bg-blue-800 hover:text-blue-100 rounded-md hover:cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sendtransactioncard;
