import { BrowserProvider, ethers } from "ethers";
import MyNFT from '../../../blockchain/NFT/build/contracts/MyNFT.json';

interface WindowWithEthereum extends Window {
  ethereum?: any;
}

declare let window: WindowWithEthereum;

export const makeNFT = () => {

  const mintNFT = async (CID?: string) => {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const metadataURI = `https://ipfs.io/ipfs/${CID}`;
    const contractABI = MyNFT.abi;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.mint(await signer.getAddress(), metadataURI);

      await transaction.wait();

      return '민팅 성공';
    } catch (err) {
      console.error("Minting failed:", err);
      return '민팅 실패';
    }
  }

  return { mintNFT };
}
