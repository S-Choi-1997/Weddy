import axios from "axios"
import { ContractData, ContractProduct, SentContractType } from "./contract.type";
import { Product } from "./product.type";

const BASE_URL = 'http://localhost:8080/api/contracts'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwidXNlck5hbWUiOiJb6rSR7KO8XzHrsJhfYzEwM1_snbTrs5HsiJhdIiwiY29kZSI6IkczNzFSTyIsImlhdCI6MTczMDQyNDQ1MSwiZXhwIjoxNzMzMDE2NDUxfQ.R7YFdmlN-IZkTeo0veuMA4W2eW_9-dXJJ-pGU8SRmPk'

//== 계약서 생성 ==//
export const createContract = async (data: Product): Promise<void> => {
  const date = new Date().toISOString().slice(0, 10);
  
  const contractProduct: ContractProduct = {
    product_id: data.id,
    product_name: data.name,
    product_content: data.content
  };

  const contract = {
    "userId": "5",
    "totalMount": data.price,
    "companyName": data.vendorName,
    "startDate": date,
    "endDate": date,
    "type": data.type,
    "product": contractProduct
  }

  return requestContract([contract]);
};

//== 계약 요청 ==//
export const requestContract = async (contract: SentContractType[]): Promise<void> => {
  console.log(contract);
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/5`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    // url: `${BASE_URL}/${sessionStorage.getItem("userId")}`,
    // headers: {
    //   Authorization: sessionStorage.getItem("token")
    // }
    data: contract
  });
  console.log(response.data);
}

//== 계약 리스트 ==//
export const myContract = async (): Promise<ContractData[]> => {
  const response = await axios({ 
    method: 'get',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    },
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    // }
  });
  return response.data.data;
};

//== 계약서 상세 조회 ==//
export const contractInfo = async (contractId?: string): Promise<ContractData> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${contractId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    // }
  });
  return response.data.data;
};

//== 계약서 전자서명 ==//
export const signature = async (signature: string): Promise<void> => {
  const response = await axios({
    method: 'patch',
    url: `${BASE_URL}/signature`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`
    // },
    data: signature
  });
  console.log(response.data);
};