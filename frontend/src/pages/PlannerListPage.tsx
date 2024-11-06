import { Product } from "@/api/product.type";
import { addProductToCart } from "@/api/productApi";
import TodoButton from "@/common/TodoButton";
import RecommendBox from "@/components/PlannerPage/RecommendBox";
import { RadioGroup } from "@/components/ui/radio-group";
// import { recommendState } from "@/store/recommendState";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useRecoilValue } from "recoil";

const PlannerList = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [categoryList, setCategoryList] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  useEffect(() => {
    setCategoryList(
      recommendList.filter((item: Product) => item.type === category)
    );
  }, [recommendList, category]);

  const handleCheckboxChange = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
    console.log(categoryList[index]);
  };

  const renderCategory = {
    STUDIO: "스튜디오",
    DRESS: "드레스",
    MAKEUP: "메이크업",
  }[category ?? ""];

  const addToCart = async () => {
    if (selectedIndex !== null) {
      await addProductToCart(categoryList[selectedIndex].id);
      navigate("/planner");
    }
  };

  return (
    <RadioGroup>
      <h1 className="text-center mt-10">{renderCategory}</h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5 mb-5">
        {categoryList.map((item: Product, index) => (
          <div key={index}>
            <RecommendBox
              isSelected={selectedIndex === index}
              onSelect={() => handleCheckboxChange(index)}
              src={item.images[0].imageUrl}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
      <div onClick={addToCart} className="flex justify-end mr-10 mb-20">
        <TodoButton title="상품 담기" />
      </div>
    </RadioGroup>
  );
};

export default PlannerList;
