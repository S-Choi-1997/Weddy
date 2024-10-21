import React, { useState } from "react";
import { wallet } from "../hooks/metaMask";
import { signature } from "../hooks/signature";
import { makeNFT } from "../hooks/nftMinting";
import { uploadToPinata } from "../hooks/upload";
import { getNFT } from "../hooks/getNFT";

const Test = () => {
  const { connectWallet } = wallet();
  const { uploadData } = uploadToPinata();
  const { mintNFT } = makeNFT();

  const [sign, setSign] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [file, setFile] = useState<any>();
  const [cid, setCid] = useState<string>();
  const [mint, setMint] = useState<any>();
  const [nfts, setNfts] = useState<any[]>([]);

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

  const handleNFT = async () => {
    const data = await getNFT();
    console.log(data);
    setNfts(data);

  }

  return (
    <>
      <button onClick={handleConnect}>지갑연결</button>
      <div>지갑 주소 : {account}</div>

      <button onClick={handleSignature}>전자서명 요청</button>
      <div>전자서명 값 : {sign}</div>

      <input type="file" onChange={handleFile} />
      <br />
      <button onClick={handleUpload}>pinata 업로드</button>
      <div>CID : {cid}</div>

      <button onClick={handleMiniting}>NFT Minting</button>
      <div>mint : {mint}</div>

      <button onClick={handleNFT}>NFT 가져오기</button>
      <div>
        {nfts.map((nft, index) => (
          <div key={index}>
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
          </div>
        ))}
      </div>
    </>
  )
}
export default Test;