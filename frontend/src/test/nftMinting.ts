import { BrowserProvider, ethers } from "ethers";
import MyNFT from '../../../blockchain/NFT/build/contracts/MyNFT.json';

const contractAddress = '0xE09a0B91F52BD80cAffbA3b4799d3f0F0F953A18';
const CID = 'Qmd5DXggMxmT6vHNN2JSSEZW7DKWnbK59KDu7xJ3v5Eu7Q';
const metadataURI = `https://ipfs.io/ipfs/${CID}`;
const contractABI = MyNFT.abi;

interface WindowWithEthereum extends Window {
  ethereum?: any;
}

declare let window: WindowWithEthereum;

export const makeNFT = () => {

  const mintNFT = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // NFT 민팅
      const transaction = await contract.mint(await signer.getAddress(), metadataURI, {
        gasLimit: 1000000
      });

      await transaction.wait();

      return '민팅 성공';
    } catch (err) {
      console.error("Minting failed:", err);
      return '민팅 실패';
    }
  }

  return { mintNFT };
}
