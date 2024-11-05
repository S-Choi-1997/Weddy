// src/api/paymentApi.ts
import axios from "axios";
import * as PortOne from "@portone/browser-sdk/v2";
import { ContractData } from "./contract.type";

const BASE_URL = "http://localhost:8080/api/payments";
const PORTONE_CHANNEL_KEY = import.meta.env.VITE_PORTONE_CHANNEL_KEY;
const PORTONE_STORE_ID = import.meta.env.VITE_PORTONE_STORE_ID;
const redirectUrl = import.meta.env.VITE_PUBLIC_URL;
// ProductType 및 ContractInfo 타입 정의
export enum ProductType {
  STUDIO = "STUDIO",
  DRESS = "DRESS",
  MAKEUP = "MAKEUP",
  // 필요한 다른 ProductType 추가
}

// 결제 요청 함수
export const requestPayment = async (
  contractInfo: ContractData
): Promise<void> => {
  console.log("PORTONE_CHANNEL_KEY:", PORTONE_CHANNEL_KEY);
  console.log("PORTONE_STORE_ID:", PORTONE_STORE_ID);
  const { title, totalMount } = contractInfo;
  const paymentId = generatePaymentId();
  const response = await PortOne.requestPayment({
    storeId: PORTONE_STORE_ID,
    channelKey: PORTONE_CHANNEL_KEY,
    paymentId: paymentId,
    orderName: title, // 상품명으로 주문명 설정
    totalAmount: parseInt(totalMount, 10), // totalMount를 숫자로 변환
    currency: "CURRENCY_KRW", // KRW로 설정 (변경 없음)
    payMethod: "EASY_PAY",
    windowType: {
      pc: "IFRAME",
      mobile: "REDIRECTION",
    },
    redirectUrl: redirectUrl, // 결제 완료 후 리다이렉트될 URL
  });

  if (response) {
    if (!response.code) {
      // 결제 성공 시 서버로 정보 전송
      await sendPaymentSuccessToServer(contractInfo);
    } else {
      alert(`결제 실패: ${response.message}`);
    }
  }
};

// 결제 성공 시 서버로 전송하는 함수
const sendPaymentSuccessToServer = async (
  contractInfo: ContractData
): Promise<void> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/success`,
      {
        productId: contractInfo.product.productId,
        productName: contractInfo.product.productName,
        productType: contractInfo.product.type,
        startDate: contractInfo.startDate,
        endDate: contractInfo.endDate,
        content: contractInfo.content,
        userId: contractInfo.customer,
        code: contractInfo.code,
        totalMount: contractInfo.totalMount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // ACCESS_TOKEN 추가
        },
      }
    );

    if (response.status === 200) {
      alert("결제 성공 정보 서버 전송 완료");
    } else {
      alert("서버 전송 실패");
    }
  } catch (error) {
    console.error("서버 전송 오류:", error);
    alert("서버 전송 중 오류가 발생했습니다.");
  }
};

// Payment ID 생성 함수
const generatePaymentId = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `ORD${year}${month}${date}-${hours}${minutes}${seconds}`;
};
