import { createContract } from "@/api/contractApi";
import { Product } from "@/api/product.type";
import TodoButton from "@/common/TodoButton";
import PlannerBox from "@/components/PlannerPage/PlannerBox";
// import { recommendState } from "@/store/recommendState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";

const PlannerPage = () => {
  const navigate = useNavigate();
  // const recommendList = useRecoilValue(recommendState);

  const recommendList: Product[] = [
    {
      id: "1",
      type: "DRESS",
      name: "웨딩 드레스 대여",
      price: "1500000",
      address: "서울 강남구",
      content: "고급스러운 웨딩 드레스 대여 서비스입니다.",
      vendorName: "Elegant Bridal",
      vendorId: "vendor1",
      images: [{imageUrl: "/dummy/test2.jpg"}],
    },
    {
      id: "2",
      type: "STUDIO",
      name: "웨딩 촬영 패키지",
      price: "3000000",
      address: "서울 마포구",
      content: "웨딩 사진 촬영 패키지로 특별한 순간을 담아드립니다.",
      vendorName: "Studio Bliss",
      vendorId: "vendor2",
      images: [{imageUrl: "/dummy/test1.jpg"}],
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
      images: [{imageUrl: "/icons/gift.png"}],
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
      images: [{imageUrl: "/icons/ring.png"}],
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
      images: [{imageUrl: "/dummy/test1.jpg"}],
    },
    {
      id: "6",
      type: "MAKEUP",
      name: "프리미엄 메이크업",
      price: "200000",
      address: "서울 강동구",
      content: "전문 아티스트의 프리미엄 메이크업 서비스입니다.",
      vendorName: "Beauty House",
      vendorId: "vendor6",
      images: [{imageUrl: "/dummy/test1.jpg"}],
    },
  ];


  const [selectedList, setSelectedList] = useState<{ [type: string]: Product | null; }>({
    studio: null,
    dress: null,
    makeup: null,
  });

  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: string]: number; }>({
    studio: 0,
    dress: 0,
    makeup: 0,
  });

  const totalAmount = Object.values(selectedAmounts).reduce((acc, amount) => acc + amount, 0);

  const handleAmountChange = ( type: string, selectedCartItem: Product | null ) => {
    const amount = selectedCartItem ? parseInt(selectedCartItem.price) : 0;

    setSelectedAmounts((prev) => ({ ...prev, [type]: amount }));
    setSelectedList((prev) => ({ ...prev, [type]: selectedCartItem }));
  };

  const handleCreateContract = async () => {
    const contractItems = Object.values(selectedList).filter(Boolean) as Product[];
    await createContract(contractItems);
    navigate("/contract/list");
  };

  return (
    <>
      <div className="m-5 flex flex-col items-center">
        <div className="flex items-center mt-5">
          <span className="text-m">
            <span className="text-main2 font-bold">WEDDY 플래너&nbsp;</span>
            추천 상품
          </span>
        </div>
      </div>
      <div className="mt-10">
        {["STUDIO", "DRESS", "MAKEUP"].map((category: string) => (
          <PlannerBox
            key={category}
            title={category}
            type={category}
            cartItem={recommendList.filter(
              (item: Product) => item.type === category
            )}
            onAmountChange={handleAmountChange}
          />
        ))}
        <div className="flex justify-between mt-10 mx-10">
          <span className="text-lg font-bold">
            총 합계: {totalAmount.toLocaleString()}원
          </span>
          <div onClick={handleCreateContract}>
            <TodoButton title="계약 요청" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlannerPage;
