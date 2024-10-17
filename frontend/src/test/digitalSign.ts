import { BrowserProvider } from "ethers"

interface WindowWithEthereum extends Window {
  ethereum?: any;
}

declare let window: WindowWithEthereum;

export const digitalsign = () => {
  const signature = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const message = "서명하려면 계속 진행해주세요.";
    const signature = await signer.signMessage(message);

    return signature;
  }

  return { signature };
}