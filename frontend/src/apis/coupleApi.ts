import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users'

//== 커플 코드 생성 ==//
export const createCoupleCode = async () => {
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/code`,
    headers: {
      Authorization: `Bearer `
    }
  });

  console.log(response.data);
}

//== 커플 코드 조회 ==//
export const getCoupleCode = async () => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/couple-code`,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
}

//== 커플 코드 연결 ==//
export const connectCoupleCode = async () => {
  const response = await axios({
    method: 'patch',
    url: `${BASE_URL}/couple-connect`,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
}