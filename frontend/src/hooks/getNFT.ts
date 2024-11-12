import { BrowserProvider, ethers } from "ethers";
import MyNFT from '@/hooks/contracts/MyNFT.json';
import detectEthereumProvider from "@metamask/detect-provider";

interface WindowWithEthereum extends Window {
  ethereum?: any;
}

declare let window: WindowWithEthereum;

//== NFT 정보 가져온 후 화면 출력 함수 ==//
export const getNFT = async () => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const contractABI = MyNFT.abi;

  const provider = new BrowserProvider(window.ethereum);
  const addressProvider = (await detectEthereumProvider()) as any;
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const walletAddresses = await addressProvider.request({ method: 'eth_requestAccounts' });
  const walletAddress = walletAddresses[0];

  const balance = await contract.balanceOf(walletAddress);
  const nftData = [];

  for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(walletAddress, i);
      const tokenURI = await contract.tokenURI(tokenId);
      const finalTokenURI = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");

      try {
          const response = await fetch(finalTokenURI, { method: 'GET' });
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const metadata = await response.json();
          nftData.push(metadata);
      } catch (error) {
          console.error(`Failed to fetch metadata for tokenId ${tokenId}:`, error);
      }
  }

  return nftData;
}
