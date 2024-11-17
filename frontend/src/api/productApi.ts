import axios from "axios";
import { Product, ReviewData } from "./product.type";

const URL = import.meta.env.VITE_PUBLIC_URL
const BASE_URL = `${URL}/api/products`

//== 모든 상품 조회 ==//
export const allProducts = async (): Promise<Product[]> => {
  const response = await axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
  
  return response.data.data;
};

//== 상품 랭킹 ==//
export const getRankedProducts = async (): Promise<Product[]> => {
  const response = await axios({
    method: 'get',
    url: `/api/products/ranking`,
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlck5hbWUiOiLstZzsirntmLgiLCJjb3VwbGVDb2RlIjoiamM3VllhIiwiaWF0IjoxNzMxNDgwNjEwLCJleHAiOjE3MzQwNzI2MTB9.Cyd6ujpcIBHibkdfBBq-OApOHykmVdlzRnRfyp5rfXI"
    }
  });
  console.log(URL)
  return response.data.data;
};

//== 상품 상세 조회 ==//
export const detailProduct = async (productId?: string): Promise<Product> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${productId}`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
  return response.data.data;
};

//== 리뷰 조회 ==//
export const getReviewList = async (productId?: string): Promise<ReviewData[]> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${productId}/review`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
  return response.data.data;
};

//== 리뷰 등록 ==//
export const submitReview = async (reviewData: ReviewData, productId?: string): Promise<void> => {
  await axios({
    method: 'post',
    url: `${BASE_URL}/${productId}/review`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    },
    data: reviewData
  });
};