import { createContract } from "@/api/contractApi";
import { Product } from "@/api/product.type";
import TodoButton from "@/common/TodoButton";
import CartBox from "@/components/PlannerPage/PlannerBox";
// import { recommendState } from "@/store/recommendState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";

const PlannerPage = () => {
  const navigate = useNavigate();
  // const recommendList = useRecoilValue(recommendState);

  const [studioList, setStudioList] = useState<Product[]>([]);
  const [dressList, setDressList] = useState<Product[]>([]);
  const [makeupList, setMakeupList] = useState<Product[]>([]);

  const recommendList: Product[] = [
    {
      id: "6",
      type: "STUDIO",
      name: "프리미엄 스튜디오 촬영",
      price: "4000000",
      address: "서울 송파구",
      content: "프리미엄 스튜디오에서 당신의 특별한 순간을 기록하세요.",
      vendorName: "Luxury Studio",
      vendorId: "vendor6",
      images: [],
    },
    {
      id: "7",
      type: "DRESS",
      name: "이브닝 드레스 대여",
      price: "700000",
      address: "서울 동작구",
      content: "우아한 이브닝 드레스를 대여하여 품격을 더하세요.",
      vendorName: "Elegant Evenings",
      vendorId: "vendor7",
      images: [],
    },
    {
      id: "8",
      type: "MAKEUP",
      name: "웨딩 데이 메이크업 패키지",
      price: "150000",
      address: "서울 관악구",
      content: "신부를 위한 특별한 메이크업 패키지를 제공합니다.",
      vendorName: "Glamour Touch",
      vendorId: "vendor8",
      images: [],
    },
    {
      id: "9",
      type: "STUDIO",
      name: "커플 스냅 촬영",
      price: "2000000",
      address: "서울 노원구",
      content: "자연스러운 커플 스냅 사진 촬영 서비스입니다.",
      vendorName: "Snap Moments",
      vendorId: "vendor9",
      images: [],
    },
    {
      id: "10",
      type: "DRESS",
      name: "트래디셔널 한복 대여",
      price: "300000",
      address: "서울 종로구",
      content: "전통미를 살린 한복 대여 서비스로 특별한 날을 장식하세요.",
      vendorName: "Heritage Wear",
      vendorId: "vendor10",
      images: [],
    },
    {
      id: "11",
      type: "MAKEUP",
      name: "신부 메이크업 리허설",
      price: "100000",
      address: "서울 영등포구",
      content: "웨딩 메이크업 리허설로 완벽한 모습을 준비하세요.",
      vendorName: "Beauty Preview",
      vendorId: "vendor11",
      images: [],
    },
  ];

  const [selectedList, setSelectedList] = useState<{
    [type: string]: Product | null;
  }>({
    studio: null,
    dress: null,
    makeup: null,
  });

  const [selectedAmounts, setSelectedAmounts] = useState<{
    [key: string]: number;
  }>({
    studio: 0,
    dress: 0,
    makeup: 0,
  });

  const totalAmount = Object.values(selectedAmounts).reduce(
    (acc, amount) => acc + amount,
    0
  );

  const handleAmountChange = (
    type: string,
    selectedCartItem: Product | null
  ) => {
    const amount = selectedCartItem ? parseInt(selectedCartItem.price) : 0;

    setSelectedAmounts((prev) => ({ ...prev, [type]: amount }));
    setSelectedList((prev) => ({ ...prev, [type]: selectedCartItem }));
  };

  const handleCreateContract = async () => {
    const contractItems = Object.values(selectedList).filter(
      Boolean
    ) as Product[];
    await createContract(contractItems);
    navigate("/contract/list");
  };

  useEffect(() => {
    setStudioList(
      recommendList.filter((product: Product) => product.type === "STUDIO")
    );
    setDressList(
      recommendList.filter((product: Product) => product.type === "DRESS")
    );
    setMakeupList(
      recommendList.filter((product: Product) => product.type === "MAKEUP")
    );
  }, []);

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
        <CartBox
          title="STUDIO"
          type="studio"
          cartItem={studioList}
          onAmountChange={handleAmountChange}
        />
        <CartBox
          title="DRESS"
          type="dress"
          cartItem={dressList}
          onAmountChange={handleAmountChange}
        />
        <CartBox
          title="MAKEUP"
          type="makeup"
          cartItem={makeupList}
          onAmountChange={handleAmountChange}
        />
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
