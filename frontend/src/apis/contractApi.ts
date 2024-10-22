import axios from "axios"
import { ContractData } from "./contract.type";

const BASE_URL = 'http://localhost:8080/api/product/contracts'

//== 계약서 상세 조회 ==//
export const contractInfo = async (contractId?: string): Promise<ContractData> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${contractId}`,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
  return response.data;
};

//== 계약서 전자서명 ==//
export const signature = async (signature: string): Promise<void> => {
  const response = await axios({
    method: 'patch',
    url: `${BASE_URL}/signature`,
    headers: {
      Authorization: `Bearer `
    },
    data: signature
  });
  console.log(response.data);
};

//== 나의 계약 리스트 ==//
export const myContract = async (): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
};