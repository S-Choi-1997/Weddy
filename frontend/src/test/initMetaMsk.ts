import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

export const connect = () => {
  //==  연결된 계정 확인하기 ==//
  const getAccounts = async (Web3: Web3) => {
    const accounts = await Web3.eth.getAccounts();
    console.log('연결된 계정 : ', accounts[0]);

    return accounts;
  }

  //== 지갑 연결 확인하기 ==//
  const initMetaMask = async () => {
    const provider = (await detectEthereumProvider()) as any;
  
    if (provider) {
      const web3 = new Web3(provider);
      
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        console.log('MetaMask 연결 성공');

        const account = await getAccounts(web3);

        return account;

      } catch (error) {
        console.error('사용자가 MetaMask 연결을 거부했습니다.');

        return '연결을 거부했습니다.';
      }

    } else {
      console.error('MetaMask가 설치되지 않았습니다.');
      return 'MetaMask가 설치되지 않았습니다.';
    }
  };

  return { initMetaMask };
}
