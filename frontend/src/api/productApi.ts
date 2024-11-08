import axios from "axios";
import { Product, ReviewData } from "./product.type";

const BASE_URL = 'http://localhost:8080/api/products'

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
    url: `${BASE_URL}/ranking`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
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

//== 상품 담기 ==//
export const addProductToCart = async (productId?: string): Promise<void> => {
  console.log(productId);
  // const response = await axios({
  //   method: 'post',
  //   url: `${BASE_URL}/${productId}/cart`,
  //   headers: {
  //     Authorization: sessionStorage.getItem('token')
  //   }
  // });
  // console.log(response.data);
};

//== 장바구니 삭제 ==//
export const deleteFromCart = async (productId?: string): Promise<void> => {
  console.log(productId);
  // const response = await axios({
  //   method: 'delete',
  //   url: `${BASE_URL}/${productId}/cart`,
  //   headers: {
  //     Authorization: sessionStorage.getItem('token')
  //   }
  // });
  // console.log(response.data);
};

//== 장바구니 리스트 조회 ==//
export const getCartItems = async (): Promise<Product[]> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/my`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
  console.log(response.data);
  return response.data;
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