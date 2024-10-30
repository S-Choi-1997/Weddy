import TodoButton from "@/common/TodoButton";
import RecommendBox from "@/components/PlannerPage/RecommendBox";
import { RadioGroup } from "@/components/ui/radio-group";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlannerList = () => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const category = useParams().category ?? '';
  const renderCategory = {
    'studio': '스튜디오',
    'dress': '드레스',
    'makeup': '메이크업',
  }[category];

  const navigate = useNavigate();

  const goPlanner =()=>{
    navigate('/planner')
  }
  
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log("선택된 값:", value);
  };

  const dummyList = [
    {
      src: "/dummy/test1.jpg",
      name: "업체1",
      price: 100000
    },
    {
      src: "/dummy/test1.jpg",
      name: "업체2",
      price: 100000
    },
    {
      src: "/dummy/test1.jpg",
      name: "업체3",
      price: 100000
    },
    {
      src: "/dummy/test1.jpg",
      name: "업체4",
      price: 100000
    },
  ]
  return (
    <RadioGroup value={selectedValue} onValueChange={handleSelect}>
      <h1 className="text-center mt-10">{renderCategory}</h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5 mb-5">
        {dummyList.map((dummy, index) => (
          <div key={index}>
            <RecommendBox isSelected={selectedValue === dummy.name} onSelect={handleSelect} src={dummy.src} name={dummy.name} price={dummy.price} />
          </div>
        ))}
      </div>
      <div onClick={goPlanner} className="flex justify-end mr-10 mb-20">
      {/* 상품담기 api 연결하고 planner로 navigate */}
      <TodoButton title="상품 담기"/>
      </div>
    </RadioGroup>
  )
}
export default PlannerList;