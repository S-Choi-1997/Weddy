import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/products'

//== 상품 조회 ==//
export const allProduct = async (): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
};

//== 상품 상세 조회 ==//
export const detailProduct = async (productId: number): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${productId}`,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
};

//== 리뷰 리스트 ==//
export const reviewList = async (productId: number): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${productId}/review`,
    headers: {
      Authorization: `Bearer `
    }
  });
  console.log(response.data);
};

//== 리뷰 등록 ==//
export const submitReview = async (productId: number, data: any): Promise<void> => {
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/${productId}/review`,
    headers: {
      Authorization: `Bearer `
    },
    data: data
  });
  console.log(response.data);
};