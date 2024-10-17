import axios from "axios"

const BASE_URL = 'http://localhost:8080/api'

//== 계약서 정보 가져오기 ==//
export const contractInfo = async (): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/`,
    headers: {
      Authorization: `Bearer `
    }
  });

  console.log(response.data);
}

//== 계약서 전자서명 ==//
export const sign = async (): Promise<void> => {
  const response = await axios({
    method: 'patch',
    url: `${BASE_URL}/`,
    headers: {
      Authorization: `Bearer `
    }
  });

  console.log(response.data);
}