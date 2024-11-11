import axios from "axios"
import { ContractData } from "./contract.type";

const BASE_URL = 'https://api.pinata.cloud/pinning'

//== 계약서 업로드 ==//
export const contractUpload = async (formData: FormData, contract?: ContractData): Promise<string> => {
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/pinFileToIPFS`,
    headers: {
      'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
      'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
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
    image: `https://ipfs.io/ipfs/${imageCID}`
  };

  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/pinJSONToIPFS`,
    headers: {
      'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
      'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
    },
    data: metadata
  });

  return response.data.IpfsHash;
};
