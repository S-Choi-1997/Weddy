import React, { useState } from "react";
import { wallet } from "./metaMask";
import { digitalsign } from "./digitalSign";
import { makeNFT } from "./nftMinting";
import { uploadToPinata } from "./upload";

const Test = () => {
  const { connectWallet } = wallet();
  const { signature } = digitalsign();
  const { uploadData } = uploadToPinata();
  const { mintNFT } = makeNFT();

  const [ sign, setSign ] = useState<any>();
  const [ account, setAccount ] = useState<any>();
  const [ file, setFile ] = useState<any>();
  const [ cid, setCid ] = useState<string>();
  const [ mint, setMint ] = useState<any>();
  
  const handleConnect = async () => {
    const data = await connectWallet();
    setAccount(data);
  }

  const handleSignature = async () => {
    const data = await signature();
    setSign(data);
  }

  //== 피나타 업로드 테스트 ==//
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const data = event.target.files[0];
      setFile(data);
    }
  }

  const handleUpload = async () => {
    const data = await uploadData(file);
    setCid(data);
  }

  const handleMiniting = async () => {
    const data = await mintNFT(cid);
    setMint(data);
  }

  return (
    <>
    <button onClick={handleConnect}>지갑연결</button>
    <div>지갑 주소 : {account}</div>

    <button onClick={handleSignature}>전자서명 요청</button>
    <div>전자서명 값 : {sign}</div>

    <input type="file" onChange={handleFile}/>
    <br />
    <button onClick={handleUpload}>pinata 업로드</button>
    <div>CID : {cid}</div>

    <button onClick={handleMiniting}>NFT Minting</button>
    <div>mint : {mint}</div>
    </>
  )
}
export default Test;