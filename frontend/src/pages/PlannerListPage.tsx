import { Product } from "@/api/product.type";
import { addProductToCart } from "@/api/productApi";
import TodoButton from "@/common/TodoButton";
import RecommendBox from "@/components/PlannerPage/RecommendBox";
import { RadioGroup } from "@/components/ui/radio-group";
import { recommendState } from "@/store/recommendState";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const PlannerList = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [categoryList, setCategoryList] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const recommendList = useRecoilValue(recommendState);

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
