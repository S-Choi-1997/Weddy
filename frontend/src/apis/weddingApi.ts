import axios from "axios"

const BASE_URL = 'http://localhost:8080/api'

//== 드레스 리스트 ==//
export const dressList = async (): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}`,
    headers: {
      Authorization: `Bearer `
    }
  });
  
  console.log(response.data);
}

//== 메이크업 리스트 ==//
export const makeupList = async (): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/`,
    headers: {
      Authorization: `Bearer `
    }
  });

  console.log(response.data);
}