import axios from "axios"

const BASE_URL = 'https://api.pinata.cloud/pinning'

//== 계약서 업로드 ==//
export const contractUpload = async (formData: FormData, category?: string): Promise<string> => {
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
  return await metadataUpload(ipfsHash, category);
};

//== 계약서 JSON 업로드 ==//
export const metadataUpload = async (imageCID: string, category?: string): Promise<string> => {
  const metadata = {
    name: category,
    description: 'description',
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
