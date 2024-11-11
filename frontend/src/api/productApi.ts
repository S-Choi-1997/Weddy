import axios from "axios";
import { Product, ReviewData } from "./product.type";

const BASE_URL = 'http://localhost:8080/api/products'

//== 모든 상품 조회 ==//
export const allProducts = async (): Promise<Product[]> => {
  // const response = await axios({
  //   method: 'get',
  //   url: BASE_URL,
  //   headers: {
  //     Authorization: sessionStorage.getItem('token')
  //   }
  // });
  // return response.data.data;
  return [
    { id: "1", type: "DRESS", name: "웨딩 드레스 대여", price: "1500000", address: "서울 강남구", content: "고급스러운 웨딩 드레스 대여 서비스입니다.", vendorName: "Elegant Bridal", vendorId: "vendor1", images: [{ imageUrl: "/dummy/test2.jpg" }] },
    { id: "2", type: "STUDIO", name: "웨딩 촬영 패키지", price: "3000000", address: "서울 마포구", content: "웨딩 사진 촬영 패키지로 특별한 순간을 담아드립니다.", vendorName: "Studio Bliss", vendorId: "vendor2", images: [{ imageUrl: "/dummy/test1.jpg" }] },
    { id: "3", type: "MAKEUP", name: "본식 메이크업", price: "100000", address: "대구", content: "본식 메이크업 서비스로 최고의 하루를 준비하세요.", vendorName: "Wedding Palace", vendorId: "vendor3", images: [{ imageUrl: "/icons/gift.png" }] },
    { id: "4", type: "STUDIO", name: "꽃 장식 서비스", price: "2000000", address: "서울 서초구", content: "아름다운 꽃 장식으로 예식을 더욱 빛나게 만들어드립니다.", vendorName: "Blooming Flora", vendorId: "vendor4", images: [{ imageUrl: "/icons/ring.png" }] },
    { id: "5", type: "DRESS", name: "본식+피로연 드레스", price: "500000", address: "광주", content: "본식과 피로연에서 입을 수 있는 드레스 대여 서비스입니다.", vendorName: "Gourmet Delight", vendorId: "vendor5", images: [{ imageUrl: "/dummy/test1.jpg" }] },
    { id: "6", type: "MAKEUP", name: "프리미엄 메이크업", price: "200000", address: "서울 강동구", content: "전문 아티스트의 프리미엄 메이크업 서비스입니다.", vendorName: "Beauty House", vendorId: "vendor6", images: [{ imageUrl: "/dummy/test1.jpg" }] },
  ];
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
  const response = await axios({
    method: 'post',
    url: `${BASE_URL}/${productId}/cart`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
  console.log(response.data);
};

//== 장바구니 삭제 ==//
export const deleteFromCart = async (productId?: string): Promise<void> => {
  const response = await axios({
    method: 'delete',
    url: `${BASE_URL}/${productId}/cart`,
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  });
  console.log(response.data);
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