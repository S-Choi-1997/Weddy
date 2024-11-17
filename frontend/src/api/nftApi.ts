import axios from "axios"
import { ContractData } from "./contract.type";

const BASE_URL = 'https://api.pinata.cloud/pinning'

//== 계약서 업로드 ==//
export const contractUpload = async (formData: FormData, contract?: ContractData): Promise<string> => {
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/pinFileToIPFS`,
    headers: {
      'pinata_api_key': '1c9ede9de3e383e16ea0',
      'pinata_secret_api_key': 'f35cf4a5b1176d50c767c43766e426e8ba35c4fddd27be6434b8ecdaa4c96b5b',
    },
    data: formData
  });

  const ipfsHash = response.data.IpfsHash;

  //== json 업로드 ==//
  return await metadataUpload(ipfsHash, contract);
};

//== 계약서 JSON 업로드 ==//
export const metadataUpload = async (imageCID: string, contract?: ContractData): Promise<string> => {
  if (!contract) {
    return '';
  }

  const metadata = {
    name: contract.product.productName,
    description: contract.product.productContent,
    contractId: contract.id,
    type: contract.product.type,
    image: `https://fuchsia-changing-flamingo-499.mypinata.cloud/ipfs/${imageCID}`
  };

  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/pinJSONToIPFS`,
    headers: {
      'pinata_api_key': '1c9ede9de3e383e16ea0',
      'pinata_secret_api_key': 'f35cf4a5b1176d50c767c43766e426e8ba35c4fddd27be6434b8ecdaa4c96b5b',
    },
    data: metadata
  });

  return response.data.IpfsHash;
};
