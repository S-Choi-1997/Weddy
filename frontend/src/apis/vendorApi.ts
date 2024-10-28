import axios from "axios"
import { VendorInfo, VendorProductInfo } from "./vendor.type";
import { ContractData } from "./contract.type";

const BASE_URL = 'http://localhost:8080/api';

export const vendorSignup = async (data: VendorInfo): Promise<void> => {
  const response = await axios ({
    method: 'post',
    url: `${BASE_URL}/vendors`,
    data: data
  });
  console.log(response.data);
};

export const registerProduct = async (data: VendorProductInfo): Promise<void> => {
  const response = await axios ({
    method: 'post',
    url: `${BASE_URL}/products`,
    headers: {
      Authorization: `Bearer `
    },
    data: data
  });
  console.log(response.data);
};

export const vendorContract = async (userId: string, data: ContractData): Promise<void> => {
  const response = await axios ({
    method: 'post',
    url: `${BASE_URL}/products/contracts/${userId}`,
    headers: {
      Authorization: `Bearer `
    },
    data: data
  });
  console.log(response.data);
};