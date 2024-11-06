import { createContract } from "@/api/contractApi";
import { Product } from "@/api/product.type";
import { deleteFromCart } from "@/api/productApi";
import TodoButton from "@/common/TodoButton";
import PlannerListBox from "@/components/PlannerPage/PlannerListBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Planner = () => {
  const navigate = useNavigate();

  const [studioList, setStudioList] = useState<Product[]>([]);
  const [dressList, setDressList] = useState<Product[]>([]);
  const [makeupList, setMakeupList] = useState<Product[]>([]);

  const [selectedList, setSelectedList] = useState<{ [type: string]: Product | null }>({
    STUDIO: null,
    DRESS: null,
    MAKEUP: null,
  });

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

  //== 총 가격 계산 ==//
  const totalAmount = Object.values(selectedList).reduce((acc, item) => acc + (Number(item?.price) || 0), 0).toLocaleString();

  //== 선택한 상품 변경 ==//
  const handleProductChange = (category: string, product: Product | null) => {
    setSelectedList((prev) => ({
      ...prev,
      [category]: product,
    }));
  };

  //== 계약서 요청 ==//
  const handleCreateContract = async () => {
    const contractItems = Object.values(selectedList).filter(Boolean) as Product[];
    await createContract(contractItems);
    navigate("/contract/list");
  };

  const deleteCartItem = async(category: string, id: string) => {
    if (category === 'STUDIO') {
      setStudioList(studioList.filter((item) => item.id !== id));
    } else if (category === 'DRESS') {
      setDressList(dressList.filter((item) => item.id !== id));
    } else if (category === 'MAKEUP') {
      setMakeupList(makeupList.filter((item) => item.id !== id));
    }

    await deleteFromCart(id);
  };

  return (
    <div className="flex flex-col relative">
      <div className="m-5 flex flex-col items-center">

        <PlannerListBox
          category="STUDIO"
          productList={studioList}
          selectedList={selectedList}
          onProductChange={handleProductChange}
          onRemove={deleteCartItem}
        />
        <PlannerListBox
          category="DRESS"
          productList={dressList}
          selectedList={selectedList}
          onProductChange={handleProductChange}
          onRemove={deleteCartItem}
        />
        <PlannerListBox
          category="MAKEUP"
          productList={makeupList}
          selectedList={selectedList}
          onProductChange={handleProductChange}
          onRemove={deleteCartItem}
        />
      </div>
      
      <div className="flex justify-end mr-10 mt-14">
        <div className="flex flex-col mr-3">
        {Object.entries(selectedList).map(([category, item]) =>
          item?.name ? (
            <span key={category} className="my-1">
              {item.name}
            </span>
          ) : null
        )}
          <span className="font-bold mt-2">총 가격: </span>
        </div>
        <div className="flex flex-col text-end">
        {Object.entries(selectedList).map(([category, item]) =>
          item?.price ? (
            <span key={category} className="my-1">
              {Number(item.price).toLocaleString()}원
            </span>
          ) : null
        )}
          <span className="font-bold mt-2">{totalAmount.toLocaleString()}원</span>
        </div>
      </div>
      
      <div className="flex justify-end mr-10 mt-5 mb-24" onClick={handleCreateContract}>
        <TodoButton title="계약 요청" />
      </div>
    </div>
  );
};

export default Planner;