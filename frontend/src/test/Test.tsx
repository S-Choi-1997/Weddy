import { useState } from "react";
import { wallet } from "./metaMask";
const Test = () => {
  const { connectWallet } = wallet();
  const [ account, setAccount ] = useState<any>();

  const handleConnect = async () => {
    const data = await connectWallet();
    setAccount(data);
  }

  return (
    <>
    <button onClick={handleConnect}>지갑연결</button>
    <div>지갑 주소 : {account}</div>
    </>
  )
}
export default Test;