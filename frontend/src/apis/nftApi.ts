import axios from "axios"

const BASE_URL = 'https://api.pinata.cloud/pinning'

//== 계약서 업로드 ==//
export const contractUpload = async (formData: FormData): Promise<void> => {
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/pinFileToIPFS`,
    headers: {
      'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
      'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
    },
    data: formData
  });

  console.log(response.data);
};

//== 계약서 JSON 업로드 ==//
export const metadataUpload = async (imageCID: string): Promise<void> => {
  const metadata = {
    name: 'name',
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

  console.log(response.data)
};
