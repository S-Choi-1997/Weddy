import { useState } from "react";
import { wallet } from "./metaMask";
import { digitalsign } from "./digitalSign";
import { makeNFT } from "./nftMinting";

const Test = () => {
  const { connectWallet } = wallet();
  const { signature } = digitalsign();
  const { mintNFT } = makeNFT();

  const [ sign, setSign ] = useState<any>();
  const [ account, setAccount ] = useState<any>();
  const [ mint, setMint ] = useState<any>();
  
  const handleConnect = async () => {
    const data = await connectWallet();
    setAccount(data);
  }

  const handleSignature = async () => {
    const data = await signature();
    setSign(data);
  }

  const handleMiniting = async () => {
    const data = await mintNFT();
    setMint(data);
  }

  return (
    <>
    <button onClick={handleConnect}>지갑연결</button>
    <div>지갑 주소 : {account}</div>

    <button onClick={handleSignature}>전자서명 요청</button>
    <div>전자서명 값 : {sign}</div>

    <button onClick={handleMiniting}>NFT Minting</button>
    <div>mint : {mint}</div>
    </>
  )
}
export default Test;