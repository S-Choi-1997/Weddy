import { Product } from "@/api/product.type";
// import { getCartItems } from "@/api/productApi";
import TodoButton from "@/common/TodoButton";
import PlannerBox from "@/components/PlannerPage/PlannerListBox";
import { useEffect, useState } from "react";
// import { useQuery } from "react-query";

const Planner = () => {
  const [ studioList, setStudioList ] = useState<Product[]>([]);
  const [ dressList, setDressList ] = useState<Product[]>([]);
  const [ makeupList, setMakeupList] = useState<Product[]>([]);

  // const { data: cartList } = useQuery("getCartItems", getCartItems);

  const cartList: Product[] = [
    {
      id: "1",
      type: "DRESS",
      name: "웨딩 드레스 대여",
      price: "1500000",
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
      price: "3000000",
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

  useEffect(() => {
    setStudioList(cartList.filter((item: Product) => item.type === "STUDIO"));
    setDressList(cartList.filter((item: Product) => item.type === "DRESS"));
    setMakeupList(cartList.filter((item: Product) => item.type === "MAKEUP"));
  }, []);

  const totalPrice = cartList.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="flex flex-col relative">
      <div className="m-5 flex flex-col items-center">
        {/* <h1 className="my-3 text-main2">WEDDY 플래너</h1> */}
        <div className="flex items-center mt-5">
          <span className="text-sm">
            <span className="text-main2 font-bold">WEDDY 플래너&nbsp;</span>
            추천 상품
          </span>
        </div>

        <PlannerBox category="STUDIO" productList={studioList} />
        <PlannerBox category="DRESS" productList={dressList} />
        <PlannerBox category="MAKEUP" productList={makeupList} />

      </div>
      <div className="flex justify-end mr-10 mt-14">
        <div className="flex flex-col mr-3">
          {cartList.map((item: Product) => (
            <span key={item.id} className="my-1">
              {item.vendorName ? item.vendorName : "상품 없음"}
            </span>
          ))}
          <span className="font-bold mt-2">총 가격: </span>
        </div>
        <div className="flex flex-col text-end">
          {cartList.map((item: Product) => (
            <span key={item.id} className="my-1">
              {Number(item.price).toLocaleString()}원
            </span>
          ))}
          <span className="font-bold">{totalPrice.toLocaleString()}원</span>
        </div>
      </div>
      <div className="flex justify-end mr-10 mt-5 mb-24">
        <TodoButton title="계약 요청" />
      </div>
    </div>
  );
};

export default Planner;
