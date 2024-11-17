import axios from "axios"
import { ContractData } from "./contract.type";

const BASE_URL = 'https://api.pinata.cloud/pinning'

//== 계약서 업로드 ==//
export const contractUpload = async (formData: FormData, contract?: ContractData): Promise<string> => {
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/pinFileToIPFS`,
    headers: {
      'pinata_api_key': '1810c5b5b6dbf8a680d6',
      'pinata_secret_api_key': 'af57f7c6da01fda5e12b8f98faff332366ed6b452ad5ae9d13d1e484510fadb3',
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
      'pinata_api_key': '1810c5b5b6dbf8a680d6',
      'pinata_secret_api_key': 'af57f7c6da01fda5e12b8f98faff332366ed6b452ad5ae9d13d1e484510fadb3',
    },
    data: metadata
  });

  return response.data.IpfsHash;
};
