import { contractUpload } from "../apis/nftApi";

export const uploadToPinata = () => {
  const formData = new FormData();

  const uploadData = async (file: File) => {

    formData.append('file', file);

    return await contractUpload(formData);
  };

  return { uploadData };
}