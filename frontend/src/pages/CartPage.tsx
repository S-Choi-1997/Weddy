import { useState, useEffect } from 'react';
import TodoButton from "@/common/TodoButton";
import CartBox from "@/components/CartPage/CartBox";

interface dummyProps {
  product: string;
  totalMount: number;
  company: string;
  type: string;
}

const CartPage = () => {
  const dummyData = [
    { product: "웨딩 드레스 대여", totalMount: 150000, company: "Elegant Bridal", type: "dress" },
    { product: "웨딩 촬영 패키지", totalMount: 30000, company: "Studio Bliss", type: "studio" },
    { product: "본식 메이크업", totalMount: 100000, company: "Wedding Palace", type: "makeup" },
    { product: "꽃 장식 서비스", totalMount: 2000000, company: "Blooming Flora", type: "studio" },
    { product: "본식+피로연 드레스", totalMount: 500000, company: "Gourmet Delight", type: "dress" },
  ];

  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: string]: number }>({
    studio: 0,
    dress: 0,
    makeup: 0,
  });

  const totalAmount = Object.values(selectedAmounts).reduce((acc, amount) => acc + amount, 0);

  const handleAmountChange = (type: string, amount: number) => {
    setSelectedAmounts((prev) => ({
      ...prev,
      [type]: amount,
    }));
  };

  const studio = dummyData.filter((item: dummyProps) => item.type === 'studio');
  const dress = dummyData.filter((item: dummyProps) => item.type === 'dress');
  const makeup = dummyData.filter((item: dummyProps) => item.type === 'makeup');

  return (
    <div className='mt-10'>
      <CartBox
        title="STUDIO"
        type="studio"
        cartItem={studio}
        onAmountChange={handleAmountChange}
      />
      <CartBox
        title="DRESS"
        type="dress"
        cartItem={dress}
        onAmountChange={handleAmountChange}
      />
      <CartBox
        title="MAKEUP"
        type="makeup"
        cartItem={makeup}
        onAmountChange={handleAmountChange}
      />
      <div className="flex justify-between mt-10 mx-10">
        <span className="text-lg font-bold">총 합계: {totalAmount.toLocaleString()}원</span>
        <TodoButton title="계약 요청" />
      </div>
    </div>
  );
};

export default CartPage;
