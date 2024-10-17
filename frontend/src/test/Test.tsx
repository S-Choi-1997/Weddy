import { useState } from "react";
import { connect } from "./initMetaMsk";

const Test = () => {
  const { initMetaMask } = connect();
  const [ account, setAccount ] = useState<any>();

  const connectWallet = async () => {
    const data = await initMetaMask();
    setAccount(data);
  }

  return (
    <>
    <button onClick={connectWallet}>지갑연결</button>
    <div>{account}</div>
    </>
  )
}
export default Test;