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
            //   data: data,
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
    <div>
      <h1>Send transaction</h1>
      <form onSubmit={handleSendTransaction}>
        <div className="flex flex-col">
          <label>
            Receiver address:
            <input type="text" name="address" onChange={handleChange} />
          </label>
          <label>
            Amount (ETH):
            <input type="text" name="amount" onChange={handleChange} />
          </label>
          <label>
            Message:
            <input type="text" name="message" onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Sendtransactioncard;
