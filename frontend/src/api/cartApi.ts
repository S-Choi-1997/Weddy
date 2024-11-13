import axios from "axios";
import { Product } from "./product.type";

const BASE_URL = "http://localhost:8080/api/users/cart";

//== 상품 담기 ==//
export const addProductToCart = async (productId?: string): Promise<void> => {
  console.log(productId);
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/add/${productId}`,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
  });
  console.log(response.data.data);
};

//== 장바구니 리스트 조회 ==//
export const getCartItems = async (): Promise<Product[]> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
  });
  console.log(response.data.data);
  return response.data.data;
};

//== 장바구니 삭제 ==//
export const deleteFromCart = async (productId?: string): Promise<void> => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/delete/${productId}`,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
  });
  console.log(response.data);
};