import { ContractProduct } from "@/api/contract.type";
import { requestContract } from "@/api/contractApi";
import { Product } from "@/api/product.type";
import TodoButton from "@/common/TodoButton";
import CartBox from "@/components/CartPage/CartBox";
import { useState } from 'react';

const CartPage = () => {
  const dummyData: Product[] = [
    {
      id: "1",
      type: "DRESS",
      name: "웨딩 드레스 대여",
      price: "150000",
      address: "서울 강남구",
      content: "고급스러운 웨딩 드레스 대여 서비스입니다.",
      vendorName: "Elegant Bridal",
      vendorId: "vendor1",
      images: [],
    },
    {
      id: "2",
      type: "STUDIO",
      name: "웨딩 촬영 패키지",
      price: "30000",
      address: "서울 마포구",
      content: "웨딩 사진 촬영 패키지로 특별한 순간을 담아드립니다.",
      vendorName: "Studio Bliss",
      vendorId: "vendor2",
      images: [],
    },
    {
      id: "3",
      type: "MAKEUP",
      name: "본식 메이크업",
      price: "100000",
      address: "서울 종로구",
      content: "본식 메이크업 서비스로 최고의 하루를 준비하세요.",
      vendorName: "Wedding Palace",
      vendorId: "vendor3",
      images: [],
    },
    {
      id: "4",
      type: "STUDIO",
      name: "꽃 장식 서비스",
      price: "2000000",
      address: "서울 서초구",
      content: "아름다운 꽃 장식으로 예식을 더욱 빛나게 만들어드립니다.",
      vendorName: "Blooming Flora",
      vendorId: "vendor4",
      images: [],
    },
    {
      id: "5",
      type: "DRESS",
      name: "본식+피로연 드레스",
      price: "500000",
      address: "서울 강남구",
      content: "본식과 피로연에서 입을 수 있는 드레스 대여 서비스입니다.",
      vendorName: "Gourmet Delight",
      vendorId: "vendor5",
      images: [],
    },
  ];

  const [selectedList, setSelectedList] = useState<{ [type: string]: Product | null }>({
    studio: null,
    dress: null,
    makeup: null,
  });
  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: string]: number }>({
    studio: 0,
    dress: 0,
    makeup: 0,
  });

  const totalAmount = Object.values(selectedAmounts).reduce((acc, amount) => acc + amount, 0);

  const handleAmountChange = (type: string, selectedCartItem: Product | null) => {
    setSelectedAmounts((prev) => ({
      ...prev,
      [type]: selectedCartItem ? parseInt(selectedCartItem.price) : 0,
    }));

    setSelectedList((prev) => ({
      ...prev,
      [type]: selectedCartItem,
    }));
  };

  const handleCreateContract = async () => {
    const contractItems = Object.values(selectedList).filter(
      (item): item is Product => item !== null
    );

    const contracts = contractItems.map((item) => {
      const date = new Date().toISOString().slice(0, 10);
  
      const contractProduct: ContractProduct = {
        productId: item.id,
        productName: item.name,
        productContent: item.content,
        type: item.type,
      };
  
      return {
        userId: "5",
        totalMount: item.price,
        companyName: item.vendorName,
        startDate: date,
        endDate: date,
        product: contractProduct,
      };
    });
  
    await requestContract(contracts);
  };

  const studio = dummyData.filter((item) => item.type === "STUDIO");
  const dress = dummyData.filter((item) => item.type === "DRESS");
  const makeup = dummyData.filter((item) => item.type === "MAKEUP");

  return (
    <div className="mt-10">
      <CartBox title="STUDIO" type="studio" cartItem={studio} onAmountChange={handleAmountChange} />
      <CartBox title="DRESS" type="dress" cartItem={dress} onAmountChange={handleAmountChange} />
      <CartBox title="MAKEUP" type="makeup" cartItem={makeup} onAmountChange={handleAmountChange} />
      <div className="flex justify-between mt-10 mx-10">
        <span className="text-lg font-bold">총 합계: {totalAmount.toLocaleString()}원</span>
        <div onClick={handleCreateContract}>
          <TodoButton title="계약 요청" />
        </div>
      </div>
    </div>
  );
};

export default CartPage;