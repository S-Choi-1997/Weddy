import { contractUpload } from "../apis/nftApi";

//== pinata에 업로드 후 ipfsHash 값 반환 ==//
export const uploadToPinata = async (file?: File, category?: string) => {
  const formData = new FormData();

  if (file){
    formData.append('file', file);
  }
  
  return await contractUpload(formData, category);
}